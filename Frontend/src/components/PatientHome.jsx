import React, { useEffect } from "react";
import "../styles/Dashboard.css";
import { useState } from "react";
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

const PatientHome = ({ summaryData }) => {
  const [logged_in_patient_data, set_patient_data] = useState({});
  const [upcomingAppointments, set_upcomingappointments] = useState({});

  useEffect(() => {
    let decodedToken = jwtDecode(localStorage.getItem("token"));
    (async function () {
      const patientAppointment = await axios.get(
        `http://localhost:5000/api/appointment/${
          jwtDecode(localStorage.getItem("token")).id
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      let userId = jwtDecode(localStorage.getItem("token")).id;
      const upData = patientAppointment.data.data.filter(
        (item) => item.userId === userId
      );
      set_upcomingappointments(
        upData.filter((appointment) => {
          return (
  new Date(appointment.dateTime) <= new Date() &&
  (() => {
    const endTime = new Date(appointment.dateTime);
    endTime.setHours(endTime.getHours() + 1); // add 1 hour
    return endTime > new Date();
  })()
);
        })
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
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card upcoming">
              <div className="summary-icon">
                <FaCalendarAlt />
              </div>
              <h3>Active Appointments</h3>
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
              <h2>Active Appointments</h2>
              <button className="view-all">View All</button>
            </div>
            <div className="cards-grid">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appt) => (
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
