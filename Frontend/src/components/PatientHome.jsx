import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
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
import axiosInstance from "../utils/axiosinstance";

const sameId = (a, b) => String(a ?? "") === String(b ?? "");

const PatientHome = ({ summaryData }) => {
  const navigate = useNavigate();
  const [upcomingAppointments, set_upcomingappointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    (async function () {
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const patientAppointment = await axios.get(
        `http://localhost:5000/api/appointment/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const rows = patientAppointment.data?.data || [];
      const upData = rows.filter((item) => {
        const uid = item.userId;
        const plain =
          uid && typeof uid === "object" && uid._id != null ? uid._id : uid;
        return sameId(plain, userId);
      });
      set_upcomingappointments(
        upData.filter(
          (appointment) => new Date(appointment.dateTime) > new Date()
        )
      );
    })();
  }, []);

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
      title: "Show Near by hospital",
      description: "Showing the nearest hospital to the patient",
      icon: "📄",
      actionText: "Show Now",
      color: "var(--success)",
    },
    {
      id: 3,
      title: "Make a Diet Plan by AI",
      description: "Access your Diet Plan",
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

  return (
    <div className="patient-dashboard">
      <div className="dashboard-main">
        <div className="dashboard-content">
          <div className="home-hero">
            <div className="home-hero-text">
              <p className="home-hero-kicker">Your health hub</p>
              <h1 className="home-hero-title">Welcome back</h1>
              <p className="home-hero-sub">
                Track visits, book care, and stay on top of what matters next.
              </p>
            </div>
            <div className="home-hero-accent" aria-hidden />
          </div>

          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card upcoming">
              <div className="summary-icon">
                <FaCalendarAlt />
              </div>
              <h3>Upcoming Appointments</h3>
              <p>{upcomingAppointments.length}</p>
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
              <button
                type="button"
                className="view-all"
                onClick={() => navigate("/dashboardPatient/appointments")}
              >
                View more
              </button>
            </div>
            <div className="cards-grid">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appt) => (
                  <AppointmentCard
                    key={appt._id || appt.id}
                    appointment={appt}
                  />
                ))
              ) : (
                <div className="empty-state">
                  No upcoming appointments scheduled
                </div>
              )}
            </div>
          </section>

          <div className="content-columns">
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
