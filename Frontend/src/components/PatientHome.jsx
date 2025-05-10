import React from "react";
import "../styles/Dashboard.css";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaPills,
  FaFileInvoiceDollar,
  FaBell,
  FaUser,
} from "react-icons/fa";
import QuickActionCard from "./QuickActionCard";
import AppointmentCard from "./Appointment";
import MessageCard from "./MessageCard";
import { toggleMobileOpen } from "../store/features/UI/uiSlice";
import patientData from "../Data/PatientData";

const PatientHome = ({ summaryData }) => {
  const {
    name = "Patient",
    upcomingAppointments = [],
    messages = [],
    prescriptions = [],
    billing = {},
  } = patientData || {};

  // Calculate summary data
  console.log(patientData);
  // Filter and sort data
  const filteredAppointments = upcomingAppointments
    .filter((appt) => ["confirmed", "upcoming"].includes(appt.status))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 2);
  console.log(filteredAppointments);
  const filteredMessages = messages
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 2);

  // Quick actions
  const quickActions = [
    {
      id: 1,
      title: "Request Appointment",
      description: "Book with a specific provider",
      icon: "📅",
      actionText: "Request now",
      color: "var(--primary)",
    },
    {
      id: 2,
      title: "Upload Documents",
      description: "Share medical records with your team",
      icon: "📄",
      actionText: "Upload now",
      color: "var(--success)",
    },
    {
      id: 3,
      title: "View Test Results",
      description: "Access your latest lab reports",
      icon: "🔬",
      actionText: "View results",
      color: "var(--purple)",
    },
    {
      id: 4,
      title: "Pay Bill",
      description: "Make a payment online",
      icon: "💳",
      actionText: "Pay now",
      color: "var(--orange)",
    },
  ];

  const userInitials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="patient-dashboard">
      {/* Sidebar */}
      {/* <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Health Portal</h2>
        </div>
        <nav>
          <ul>
            <li className="active">
              <button className="sidebar-tab">
                <span className="tab-icon">🏠</span>
                <span className="tab-label">Dashboard</span>
              </button>
            </li>
            <li>
              <button className="sidebar-tab">
                <span className="tab-icon">📅</span>
                <span className="tab-label">Appointments</span>
              </button>
            </li>
            <li>
              <button className="sidebar-tab">
                <span className="tab-icon">💊</span>
                <span className="tab-label">Prescriptions</span>
              </button>
            </li>
            <li>
              <button className="sidebar-tab">
                <span className="tab-icon">💬</span>
                <span className="tab-label">Messages</span>
              </button>
            </li>
            <li>
              <button className="sidebar-tab">
                <span className="tab-icon">💰</span>
                <span className="tab-label">Billing</span>
              </button>
            </li>
            <li className="logout">
              <button className="sidebar-tab">
                <span className="tab-icon">🚪</span>
                <span className="tab-label">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-content">
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card upcoming">
              <div className="summary-icon">
                <FaCalendarAlt />
              </div>
              <h3>Upcoming Appointments</h3>
              <p>{summaryData.upcomingAppointments}</p>
            </div>
            <div className="summary-card messages">
              <div className="summary-icon">
                <FaEnvelope />
              </div>
              <h3>Unread Messages</h3>
              <p>{summaryData.unreadMessages}</p>
            </div>
            <div className="summary-card prescriptions">
              <div className="summary-icon">
                <FaPills />
              </div>
              <h3>Active Prescriptions</h3>
              <p>{summaryData.activePrescriptions}</p>
            </div>
            <div className="summary-card bills">
              <div className="summary-icon">
                <FaFileInvoiceDollar />
              </div>
              <h3>Total Due</h3>
              <p>${summaryData.totalBillsDue.toFixed(2)}</p>
            </div>
          </div>

          {/* Main Content Sections */}
          <section className="dashboard-section appointments-section">
            <div className="section-header">
              <h2>Upcoming Appointments</h2>
              <button className="view-all">View All</button>
            </div>
            <div className="cards-grid">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt) => (
                  <AppointmentCard key={appt.id} appointment={appt} />
                ))
              ) : (
                <div className="empty-state">
                  No upcoming appointments scheduled
                </div>
              )}
            </div>
          </section>

          <div className="content-columns">
            <section className="dashboard-section messages-section">
              <div className="section-header">
                <h2>Recent Messages</h2>
                <button className="view-all">View All</button>
              </div>
              <div className="messages-list">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((msg) => (
                    <MessageCard key={msg.id} message={msg} />
                  ))
                ) : (
                  <div className="empty-state">No recent messages</div>
                )}
              </div>
            </section>

            <section className="dashboard-section quick-actions-section">
              <div className="section-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="actions-grid">
                {quickActions.map((action) => (
                  <QuickActionCard key={action.id} action={action} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
