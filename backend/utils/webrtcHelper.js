// /utils/webrtcHelper.js

const socketIo = require('socket.io');

let io;

const initWebRTC = (server) => {
  io = socketIo(server); // Attach socket.io to the HTTP server

  io.on('connection', (socket) => {
    console.log('A user connected to WebRTC.');

    // Handle WebRTC signaling for connecting doctor and patient
    socket.on('signal', (data) => {
      console.log('Received signal:', data);
      // Emit to the target (either patient or doctor)
      io.to(data.target).emit('signal', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected from WebRTC');
    });
  });
};

const getWebRTCInstance = () => io;

module.exports = {
  initWebRTC,
  getWebRTCInstance,
};
