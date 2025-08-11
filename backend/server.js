// Core Modules & Packages
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const { initWebRTC } = require("./utils/webrtcHelper"); // WebRTC helper
const redis = require("./config/redis"); // Redis configuration
const { connectDb } = require("./config/db"); // MongoDB configuration

// Middleware
const authenticate = require("./middleware/authenticate");
const authorizeRoles = require("./middleware/authorizeRoles");

// Controllers
const paymentController = require("./controllers/paymentController");
const consultationController = require("./controllers/consultationController");
const conversationController = require("./controllers/conversationController");
const patientController = require("./controllers/patientController");
const dietController = require("./controllers/dietController");
const doctorController = require("./controllers/doctorController");
const adminController = require("./controllers/adminController");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const appointmentController = require("./controllers/appointmentController");

// Routes
const paymentRoutes = require("./routes/paymentRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const patientRoutes = require("./routes/patientRoutes");
const dietRoutes = require("./routes/dietRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sendEmailRoutes = require("./routes/sendConfirmationMail");
const sendSocketCode = require("./routes/sendSocketCode");
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// CORS configuration
app.use(
  cors({
    origin: "*", // Change in production
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connectDb();

// Static file serving for uploads
app.use("/uploads", express.static(path.join(__dirname, "storage/uploads")));

// ========== ROUTES ==========
app.use("/api", paymentRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/diets", dietRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", sendEmailRoutes);
app.use("/api/sendSocketCode",sendSocketCode);
// Handle unknown routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// ================= SOCKET.IO SETUP =================
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 120000,
    skipMiddlewares: true
  }
});

const users = {}; // store userId → socketId

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins
  socket.on("join", (userId) => {
    if (!userId || typeof userId !== "string") {
      console.error("Invalid userId:", userId);
      return socket.disconnect(true);
    }

    // Kick duplicate
    if (users[userId]) {
      console.log(`Displacing previous connection for ${userId}`);
      io.to(users[userId]).emit("duplicate-connection");
      delete users[userId];
    }

    users[userId] = socket.id;
    socket.userId = userId;

    console.log(`User ${userId} joined. Active users: ${Object.keys(users).length}`);
  });

  // Messaging
  socket.on("message", (data) => {
    try {
      if (!data?.target || !data?.text || !data?.sender) {
        throw new Error("Invalid message data");
      }

      const targetSocketId = users[data.target];
      if (!targetSocketId) {
        throw new Error(`Target user ${data.target} not found`);
      }

      io.to(targetSocketId).emit("message", {
        sender: data.sender,
        text: data.text,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error("Message error:", err.message);
      socket.emit("message-error", err.message);
    }
  });

  // WebRTC signaling
  socket.on("signal", (data) => {
    try {
      if (!data?.target || !data?.signal) {
        throw new Error("Invalid signal data");
      }

      const targetSocketId = users[data.target];
      if (!targetSocketId) {
        throw new Error(`Target user ${data.target} not found`);
      }

      io.to(targetSocketId).emit("signal", {
        sender: socket.userId,
        signal: data.signal
      });
    } catch (err) {
      console.error("Signaling error:", err.message);
      socket.emit("signal-error", err.message);
    }
  });

  // Disconnect
  socket.on("disconnect", (reason) => {
    if (socket.userId) {
      delete users[socket.userId];
      console.log(`User ${socket.userId} disconnected. Reason: ${reason}`);
      io.emit("user-disconnected", socket.userId);
    }
  });

  // Heartbeat
  const interval = setInterval(() => {
    if (!socket.connected) {
      clearInterval(interval);
      return;
    }
    socket.emit("ping");
  }, 30000);

  socket.on("pong", () => {
    console.log(`Heartbeat received from ${socket.userId}`);
  });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000; // changed from 5000 to avoid conflict
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
