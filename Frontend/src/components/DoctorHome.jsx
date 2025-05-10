import React, { useState } from "react";
import AppointmentCard from "./Appointment";
import MessageCard from "./MessageCard";
import PatientCard from "./PatientCard";
import QuickActionCard from "./QuickActionCard";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaUserFriends,
  FaBell,
  FaUser,
  FaStethoscope,
} from "react-icons/fa";

const DoctorHome = () => {
  // State for dynamic data
  const [todaysAppointments, setTodaysAppointments] = useState([
    {
      id: 1,
      title: "Annual Physical",
      patient: "John Doe",
      date: "Today",
      time: "10:00 AM",
      location: "Exam Room 3",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Follow-up Visit",
      patient: "Sarah Johnson",
      date: "Today",
      time: "11:30 AM",
      location: "Exam Room 2",
      status: "upcoming",
    },
  ]);

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

  const [recentPatients, setRecentPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      lastVisit: "Dec 15, 2023",
      nextAppointment: "Jan 10, 2024",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      lastVisit: "Dec 10, 2023",
      nextAppointment: "Jan 5, 2024",
      avatar: "SJ",
    },
  ]);

  // Summary data
  const summaryData = {
    upcomingAppointments: todaysAppointments.length,
    unreadMessages: recentMessages.filter((msg) => msg.unread).length,
    activePatients: recentPatients.length,
    completedVisits: 42, // Example static data
  };

  // Quick actions for doctors
  const quickActions = [
    {
      id: 1,
      title: "Start Consultation",
      description: "Begin a virtual visit with a patient",
      icon: <FaStethoscope />,
      actionText: "Start Now",
      color: "var(--primary)",
    },
    {
      id: 2,
      title: "Write Prescription",
      description: "Create and send a new prescription",
      icon: "💊",
      actionText: "Create Now",
      color: "var(--success)",
    },
    {
      id: 3,
      title: "Order Tests",
      description: "Request lab tests for patients",
      icon: "🔬",
      actionText: "Order Now",
      color: "var(--purple)",
    },
    {
      id: 4,
      title: "View Schedule",
      description: "Check your full appointment calendar",
      icon: "📅",
      actionText: "View Now",
      color: "var(--orange)",
    },
  ];

  // Filter and sort data
  const filteredAppointments = todaysAppointments
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
          <h3>Today's Appointments</h3>
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
              <h2>Today's Appointments</h2>{" "}
            </div>
            <div className="cards-grid">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt) => (
                  <AppointmentCard
                    key={appt.id}
                    appointment={appt}
                    isDoctorView
                    onCancel={() => handleCancelAppointment(appt.id)}
                  />
                ))
              ) : (
                <div className="empty-state">
                  No appointments scheduled for today
                </div>
              )}
            </div>
          </section>

          <section className="dashboard-section patients-section">
            <div className="section-header">
              <h2>Recent Patients</h2>
              {/* <button className="view-all">View All</button> */}
            </div>
            <div className="patients-grid">
              {recentPatients.length > 0 ? (
                recentPatients.map((patient) => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    onSelect={() => handleViewPatient(patient.id)}
                  />
                ))
              ) : (
                <div className="empty-state">No recent patients</div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="content-right">
          <section className="dashboard-section quick-actions-section">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="actions-grid">
              {quickActions.map((action) => (
                <QuickActionCard
                  key={action.id}
                  action={action}
                  onClick={() => handleQuickAction(action.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  // Handler functions
  function handleCancelAppointment(appointmentId) {
    setTodaysAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointmentId ? { ...appt, status: "cancelled" } : appt
      )
    );
  }

  function handleViewPatient(patientId) {
    // Navigate to patient details or open modal
    console.log("View patient:", patientId);
  }

  function handleMarkAsRead(messageId) {
    setRecentMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, unread: false } : msg
      )
    );
  }

  function handleReplyToMessage(messageId) {
    // Implement reply functionality
    console.log("Reply to message:", messageId);
  }

  function handleQuickAction(actionId) {
    // Handle different quick actions
    console.log("Quick action:", actionId);
    // You can add navigation or modal opening logic here
  }
};

export default DoctorHome;
