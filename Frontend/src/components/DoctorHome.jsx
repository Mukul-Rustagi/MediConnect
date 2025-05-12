import React, { useEffect, useState } from "react";
import AppointmentCard from "./Appointment";
import MessageCard from "./MessageCard";
import PatientCard from "./PatientCard";
import QuickActionCard from "./QuickActionCard";
import { jwtDecode } from "jwt-decode";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaUserFriends,
  FaBell,
  FaUser,
  FaStethoscope,
} from "react-icons/fa";
import axios from "axios";

const DoctorHome = () => {
  const [appointments, setAppointments] = useState([]);
  const [recentMessages, setRecentMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      preview: "I have a question about my recent lab results...",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      preview: "Thank you for the prescription!",
      time: "Yesterday",
      unread: false,
    },
  ]);
  const [recentPatients, setRecentPatients] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      const doctorId = jwtDecode(token).id;
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/appointment/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // Only show appointments for this doctor
      setAppointments(response.data.data.filter(item => item.doctorId === doctorId));
    };
    fetchAppointments();
  }, []);

  // Summary data
  const summaryData = {
    upcomingAppointments: appointments.length,
    unreadMessages: recentMessages.filter((msg) => msg.unread).length,
    activePatients: recentPatients.length,
    completedVisits: 42, // Example static data
  };

  const filteredAppointments = appointments
    .filter((appt) => ["confirmed", "upcoming"].includes(appt.status))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const filteredMessages = recentMessages.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  return (
    <div className="doctor-dashboard">
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card upcoming">
          <div className="summary-icon">
            <FaCalendarAlt />
          </div>
          <h3>Upcoming Appointments</h3>
          <p>{summaryData.upcomingAppointments}</p>
        </div>
        {/* <div className="summary-card messages">
          <div className="summary-icon">
            <FaEnvelope />
          </div>
          <h3>Unread Messages</h3>
          <p>{summaryData.unreadMessages}</p>
        </div> */}
        <div className="summary-card patients">
          <div className="summary-icon">
            <FaUserFriends />
          </div>
          <h3>Active Patients</h3>
          <p>{summaryData.activePatients}</p>
        </div>
        <div className="summary-card visits">
          <div className="summary-icon">
            <FaUser />
          </div>
          <h3>Completed Visits</h3>
          <p>{summaryData.completedVisits}</p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="content-columns">
        {/* Left Column */}
        <div className="content-left">
          <section className="dashboard-section appointments-section">
            <div className="section-header">
              <h2>Upcoming Appointments</h2>
            </div>
            <div className="cards-grid">
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <AppointmentCard
                    key={appt._id || appt.id}
                    appointment={appt}
                    isDoctorView
                  />
                ))
              ) : (
                <div className="empty-state">
                  No appointments scheduled
                </div>
              )}
            </div>
          </section>

          
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;
