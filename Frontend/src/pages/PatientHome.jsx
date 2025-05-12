import React, { useState, useEffect } from 'react';
import { FaVideo, FaUserMd, FaCalendarAlt, FaClock } from 'react-icons/fa';
import VideoChat from '../components/VideoChat';
import '../styles/PatientHome.css';

const PatientHome = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [showVideoChat, setShowVideoChat] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Fetch upcoming appointments
    const fetchAppointments = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:5000/api/appointment/patient/${userId}`);
        const data = await response.json();
        
        // Filter for upcoming confirmed appointments
        const upcoming = data.filter(apt => 
          new Date(apt.date) >= new Date() && 
          apt.status === 'confirmed'
        );
        
        setUpcomingAppointments(upcoming);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleJoinMeeting = (appointment) => {
    setSelectedAppointment(appointment);
    setShowVideoChat(true);
  };

  const formatDateTime = (date, time) => {
    const appointmentDate = new Date(date);
    return appointmentDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }) + ' at ' + time;
  };

  return (
    <div className="patient-home">
      <div className="welcome-section">
        <h1>Welcome to Your Patient Dashboard</h1>
        <p>Manage your appointments and connect with your doctors</p>
      </div>

      <div className="upcoming-appointments">
        <h2>Upcoming Appointments</h2>
        {upcomingAppointments.length === 0 ? (
          <p className="no-appointments">No upcoming appointments</p>
        ) : (
          <div className="appointments-grid">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <div className="appointment-header">
                  <FaUserMd className="doctor-icon" />
                  <h3>Dr. {appointment.doctorName}</h3>
                </div>
                
                <div className="appointment-details">
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>{formatDateTime(appointment.date, appointment.time)}</span>
                  </div>
                  <div className="detail-item">
                    <FaClock />
                    <span>Duration: 30 minutes</span>
                  </div>
                </div>

                <div className="appointment-actions">
                  <button 
                    className="join-meeting-btn"
                    onClick={() => handleJoinMeeting(appointment)}
                  >
                    <FaVideo />
                    Join Video Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showVideoChat && selectedAppointment && (
        <VideoChat
          appointment={selectedAppointment}
          onClose={() => {
            setShowVideoChat(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
};

export default PatientHome; 