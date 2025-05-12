import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { FaVideo, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import '../styles/VideoChat.css';

// Initialize socket connection with error handling
let socket;
try {
  socket = io('http://localhost:5000', {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
} catch (error) {
  console.error('Failed to initialize socket connection:', error);
}

const VideoChat = ({ appointment, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [callStatus, setCallStatus] = useState('connecting');
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [error, setError] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket) {
      setError('Failed to connect to video chat server');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User ID not found');
      return;
    }

    socket.emit('join', userId);

    socket.on('connect_error', (err) => {
      setError('Connection error: ' + err.message);
    });

    socket.on('error', (err) => {
      setError('Socket error: ' + err.message);
    });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      socket.disconnect();
    };
  }, []);

  const initPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('signal', {
          target: appointment.doctorId,
          signal: {
            type: 'candidate',
            candidate: event.candidate,
          },
        });
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pcRef.current = pc;
  };

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;

      if (pcRef.current) {
        stream.getTracks().forEach(track => {
          pcRef.current.addTrack(track, stream);
        });
      }
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  useEffect(() => {
    socket.on('signal', async (data) => {
      if (data.sender !== appointment.doctorId) return;

      try {
        const pc = pcRef.current;
        if (!pc) return;

        if (data.signal.type === 'offer') {
          await pc.setRemoteDescription(new RTCSessionDescription(data.signal));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          socket.emit('signal', {
            target: appointment.doctorId,
            signal: answer,
          });
          setCallStatus('connected');
        } else if (data.signal.type === 'answer') {
          await pc.setRemoteDescription(new RTCSessionDescription(data.signal));
          setCallStatus('connected');
        } else if (data.signal.type === 'candidate') {
          await pc.addIceCandidate(new RTCIceCandidate(data.signal.candidate));
        }
      } catch (err) {
        console.error('Error handling signal:', err);
      }
    });

    socket.on('user-disconnected', (disconnectedUserId) => {
      if (disconnectedUserId === appointment.doctorId) {
        setCallStatus('disconnected');
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
        }
      }
    });
  }, [appointment.doctorId]);

  useEffect(() => {
    initPeerConnection();
    startLocalVideo();
  }, []);

  const endCall = () => {
    setCallStatus('disconnected');
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      text: newMessage,
      target: appointment.doctorId,
      sender: localStorage.getItem('userId'),
    };

    socket.emit('message', messageData);
    setMessages(prev => [...prev, {
      sender: localStorage.getItem('userId'),
      text: newMessage,
      timestamp: new Date().toISOString(),
      isLocal: true,
    }]);
    setNewMessage('');
  };

  useEffect(() => {
    const handleMessage = (data) => {
      setMessages(prev => [...prev, {
        sender: data.sender,
        text: data.text,
        timestamp: data.timestamp,
        isLocal: false,
      }]);
    };

    socket.on('message', handleMessage);
    return () => {
      socket.off('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="video-chat-modal">
      <div className="video-chat-container">
        {error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={onClose} className="btn btn-primary">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="video-grid">
              <div className="video-box local">
                <video ref={localVideoRef} autoPlay muted playsInline />
                <div className="video-label">You</div>
              </div>
              <div className="video-box remote">
                <video ref={remoteVideoRef} autoPlay playsInline />
                <div className="video-label">Doctor</div>
              </div>
            </div>

            <div className="controls">
              <button onClick={toggleMute} className={`control-btn ${isMuted ? 'active' : ''}`}>
                {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              <button onClick={toggleVideo} className={`control-btn ${isVideoOff ? 'active' : ''}`}>
                {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
              </button>
              <button onClick={endCall} className="control-btn end-call">
                <FaPhoneSlash />
              </button>
            </div>

            <div className="chat-section">
              <div className="messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.isLocal ? 'local' : 'remote'}`}>
                    <div className="message-bubble">
                      {msg.text}
                      <div className="timestamp">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                />
                <button onClick={sendMessage} disabled={!newMessage.trim()}>
                  Send
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoChat; 