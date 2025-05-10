import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaTimes,
} from "react-icons/fa";

const AppointmentCard = ({ appointment, isDoctorView = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <>
      <div className={`appointment-card ${appointment.status}`}>
        <div className="appointment-header">
          <div className="appointment-icon">
            <FaCalendarAlt />
          </div>
          <h3>{appointment.title}</h3>
          <span className={`status-badge ${appointment.status}`}>
            {appointment.status}
          </span>
        </div>

        <div className="appointment-details">
          <div className="detail-row">
            <FaUserMd className="detail-icon" />
            <span>
              {isDoctorView
                ? `Patient: ${appointment.patient}`
                : `${appointment.doctor.name}`}
            </span>
          </div>
          <div className="detail-row">
            <FaCalendarAlt className="detail-icon" />
            <span>
              {new Date(appointment.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              at {appointment.time}
            </span>
          </div>
        </div>

        <div className="card-actions">
          <button className="btn btn-outline" onClick={toggleDetails}>
            View Details
          </button>
          <button className="btn btn-primary">Reschedule</button>
        </div>
      </div>

      {/* Detailed View Modal */}
      {showDetails && (
        <div className="appointment-detail-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Appointment Details</h2>
              <button className="close-btn" onClick={toggleDetails}>
                <FaTimes />
              </button>
            </div>

            <div className="detail-section">
              <h3>Appointment Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Title:</span>
                  <span className="detail-value">{appointment.title}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status ${appointment.status}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">
                    {isDoctorView ? "Patient:" : "Doctor:"}
                  </span>
                  <span className="detail-value">
                    {isDoctorView
                      ? appointment.patient
                      : `Dr. ${appointment.doctor}`}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{appointment.time}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">30 minutes</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{appointment.location}</span>
                </div>
                {appointment.notes && (
                  <div className="detail-item full-width">
                    <span className="detail-label">Notes:</span>
                    <span className="detail-value">{appointment.notes}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={toggleDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentCard;
