const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { initWebRTC } = require('./utils/webrtcHelper'); // WebRTC helper
const redis = require('./config/redis'); // Redis configuration
const { connectDB } = require('./config/db'); // MongoDB configuration

// Middleware
const authenticate = require('./middleware/authenticate');
const authorizeRoles = require('./middleware/authorizeRoles');

// Controllers
const paymentController = require('./controllers/paymentController');
const consultationController = require('./controllers/consultationController');
const conversationController = require('./controllers/conversationController');
const patientController = require('./controllers/patientController');

// Routes
const paymentRoutes = require('./routes/paymentRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const patientRoutes = require('./routes/patientRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Create HTTP server for WebSocket (Socket.IO)
const server = http.createServer(app);

// Initialize WebRTC signaling
initWebRTC(server);

// Use CORS and Body Parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connectDB();

// Redis connection
redis.connect(); // Ensure Redis is connected for caching

// Static file serving for uploaded files (Multer uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes for API Endpoints
app.use('/api/payments', paymentRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/patients', patientRoutes);

// WebRTC signaling (WebSockets)
const io = socketIo(server);

// Sample WebRTC connection handling
io.on('connection', (socket) => {
  console.log('A user connected to WebRTC.');

  // Handle WebRTC signaling messages
  socket.on('signal', (data) => {
    console.log('Received WebRTC signal:', data);
    // Forward the signal to the appropriate target (doctor/patient)
    io.to(data.target).emit('signal', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected from WebRTC');
  });
});

// API endpoint for processing payment
app.post('/api/payment', paymentController.processPayment);

// API endpoint for fetching payment status
app.get('/api/payment/status/:paymentId', paymentController.getPaymentStatus);

// API endpoint for consultation booking
app.post('/api/consultation', consultationController.createConsultation);

// API endpoint for conversation storage as PDF
app.post('/api/conversation/store', conversationController.storeConversation);

// API endpoint for patient file upload (using Multer)
app.post('/api/patient/uploadFile', patientController.uploadFile);

// Error handling for invalid routes
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
