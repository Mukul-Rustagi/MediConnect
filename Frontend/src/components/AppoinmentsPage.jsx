import "../styles/MedicalPage.css";
import React, { useState } from "react";

const AppoinmentsPage = ({ isDoctorView = false }) => {
  const [activeFilter, setActiveFilter] = useState("upcoming");

  // Sample appointment data
  const appointments = [
    {
      id: 1,
      title: "Annual Physical Exam",
      provider: isDoctorView ? "John Doe" : "Dr. Samantha Freeman",
      date: "2023-12-20",
      time: "10:00 AM",
      status: "confirmed",
      type: "General Checkup",
      location: "Main Clinic, Room 302",
    },
    {
      id: 2,
      title: "Dermatology Consultation",
      provider: isDoctorView ? "Sarah Johnson" : "Dr. Michael Chen",
      date: "2023-12-22",
      time: "2:30 PM",
      status: "pending",
      type: "Specialist Visit",
      location: "Specialty Center",
    },
    {
      id: 3,
      title: "Follow-up Visit",
      provider: isDoctorView ? "Robert Brown" : "Dr. Samantha Freeman",
      date: "2023-12-15",
      time: "11:00 AM",
      status: "completed",
      type: "Follow-up",
      location: "Main Clinic, Room 305",
    },
  ];

  const filteredAppointments = appointments.filter((appt) => {
    if (activeFilter === "upcoming") {
      return appt.status !== "completed";
    } else if (activeFilter === "past") {
      return appt.status === "completed";
    }
    return true;
  });

  return (
    <div className="medical-page">
      <header className="page-header">
        <h1>Appointments</h1>
        <div className="action-buttons">
          <button className="btn primary">+ New Appointment</button>
        </div>
      </header>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All Appointments
        </button>
        <button
          className={`filter-tab ${
            activeFilter === "upcoming" ? "active" : ""
          }`}
          onClick={() => setActiveFilter("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`filter-tab ${activeFilter === "past" ? "active" : ""}`}
          onClick={() => setActiveFilter("past")}
        >
          Past
        </button>
      </div>

      <div className="appointments-list">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`appointment-card ${appointment.status}`}
            >
              <div className="appointment-main">
                <h3>{appointment.title}</h3>
                <p className="appointment-meta">
                  <span className="label">With:</span> {appointment.provider}
                </p>
                <p className="appointment-meta">
                  <span className="label">When:</span>{" "}
                  {new Date(appointment.date).toLocaleDateString()} at{" "}
                  {appointment.time}
                </p>
                <p className="appointment-meta">
                  <span className="label">Type:</span> {appointment.type}
                </p>
                <p className="appointment-meta">
                  <span className="label">Location:</span>{" "}
                  {appointment.location}
                </p>
              </div>
              <div className="appointment-actions">
                <span className={`status-badge ${appointment.status}`}>
                  {appointment.status}
                </span>
                <div className="action-buttons">
                  {appointment.status === "pending" && (
                    <button className="btn small">Confirm</button>
                  )}
                  <button className="btn small secondary">Reschedule</button>
                  <button className="btn small">Details</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No {activeFilter} appointments found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppoinmentsPage;
