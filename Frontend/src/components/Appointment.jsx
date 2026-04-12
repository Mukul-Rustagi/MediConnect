import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaTimes,
} from "react-icons/fa";
import "../styles/Appointment.css";

const refId = (ref) => {
  if (ref == null) return null;
  if (typeof ref === "object" && ref._id != null) return String(ref._id);
  return String(ref);
};

const AppointmentCard = ({ appointment, isDoctorView = false }) => {
  const [doctorData, setDoctorData] = useState();
  const [patientData, setPatientData] = useState();
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role || "");
      } catch (e) {
        setRole("");
      }
    }
  }, []);

  const isDoctor = role?.toLowerCase() === "doctor";

  useEffect(() => {
    if (!appointment) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    if (isDoctor && appointment.userId) {
      const uid = refId(appointment.userId);
      if (!uid) return;
      (async function () {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/user/profile/${uid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setPatientData(response.data.data);
        } catch (e) {
          setPatientData(undefined);
        }
      })();
    } else if (!isDoctor && appointment.doctorId) {
      const did = refId(appointment.doctorId);
      if (!did) return;
      (async function () {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/doctors/${did}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setDoctorData(response.data.data);
        } catch (e) {
          setDoctorData(undefined);
        }
      })();
    }
  }, [isDoctor, appointment]);

  const displayTitle =
    appointment?.reason ||
    appointment?.title ||
    "Medical consultation";

  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);
  const handleRedirect = () => {
    window.location.href = "https://webrtc-testing-t2az.onrender.com/";
  };
  return (
    <>
      <div className={`appointment-card ${appointment.status}`}>
        <div className="appointment-header">
          <div className="appointment-icon">
            <FaCalendarAlt />
          </div>
          <h3>{displayTitle}</h3>
          <span className={`status-badge ${appointment.status}`}>
            {appointment.status}
          </span>
        </div>

        <div className="appointment-details">
          <div className="detail-row">
            <FaUserMd className="detail-icon" />
            <span>
              {isDoctor
                ? patientData
                  ? `${patientData.firstName} ${patientData.lastName}`
                  : "Loading..."
                : doctorData
                ? `Dr. ${doctorData.firstName} ${doctorData.lastName}`
                : "Loading..."}
            </span>
          </div>
          {isDoctor && patientData && (
            <>
              <div className="detail-row">
                <span className="detail-icon">📧</span>
                <span>Email: {patientData.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">📞</span>
                <span>Phone: {patientData.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">🏠</span>
                <span>Address: {patientData.address}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">🎂</span>
                <span>
                  DOB:{" "}
                  {patientData.dateOfBirth
                    ? new Date(patientData.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">⚧️</span>
                <span>Gender: {patientData.gender}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">🩸</span>
                <span>Blood Type: {patientData.bloodType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">🌿</span>
                <span>Allergies: {patientData.allergies}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">💊</span>
                <span>Medications: {patientData.medications}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">🩺</span>
                <span>Conditions: {patientData.conditions}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">🌍</span>
                <span>Country: {patientData.country}</span>
              </div>
              {patientData.profilePicture && (
                <div className="detail-row">
                  <span className="detail-icon">🖼️</span>
                  <span>
                    Profile Picture:{" "}
                    <img
                      src={patientData.profilePicture}
                      alt="Profile"
                      style={{ width: 40, height: 40, borderRadius: "50%" }}
                    />
                  </span>
                </div>
              )}
            </>
          )}
          {doctorData && !isDoctor && (
            <>
              <div className="detail-row">
                <span className="detail-icon">🏥</span>
                <span>Specialization: {doctorData.specialization}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">📞</span>
                <span>Contact: {doctorData.phoneNumber}</span>
              </div>
            </>
          )}
          <div className="detail-row">
            <FaCalendarAlt className="detail-icon" />
            <span>
              {new Date(appointment.dateTime).toLocaleDateString("en-US", {
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
          <button className="btn btn-secondary" onClick={handleRedirect}>
            Join Meeting
          </button>
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
                  <span className="detail-value">{displayTitle}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status ${appointment.status}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">
                    {isDoctor ? "Patient:" : "Doctor:"}
                  </span>
                  <span className="detail-value">
                    {isDoctor
                      ? patientData
                        ? `${patientData.firstName} ${patientData.lastName}`
                        : "Loading..."
                      : doctorData
                      ? `Dr. ${doctorData.firstName} ${doctorData.lastName}`
                      : "Loading..."}
                  </span>
                </div>
                {isDoctor && patientData && (
                  <>
                    <div className="detail-item">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{patientData.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">{patientData.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Address:</span>
                      <span className="detail-value">
                        {patientData.address}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">DOB:</span>
                      <span className="detail-value">
                        {patientData.dateOfBirth
                          ? new Date(
                              patientData.dateOfBirth
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Gender:</span>
                      <span className="detail-value">{patientData.gender}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Blood Type:</span>
                      <span className="detail-value">
                        {patientData.bloodType}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Allergies:</span>
                      <span className="detail-value">
                        {patientData.allergies}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Medications:</span>
                      <span className="detail-value">
                        {patientData.medications}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Conditions:</span>
                      <span className="detail-value">
                        {patientData.conditions}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Country:</span>
                      <span className="detail-value">
                        {patientData.country}
                      </span>
                    </div>
                    {patientData.profilePicture && (
                      <div className="detail-item">
                        <span className="detail-label">Profile Picture:</span>
                        <span className="detail-value">
                          <img
                            src={patientData.profilePicture}
                            alt="Profile"
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                            }}
                          />
                        </span>
                      </div>
                    )}
                  </>
                )}
                {doctorData && !isDoctor && (
                  <>
                    <div className="detail-item">
                      <span className="detail-label">Specialization:</span>
                      <span className="detail-value">
                        {doctorData.specialization}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Experience:</span>
                      <span className="detail-value">
                        {doctorData.experienceYears} years
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Contact:</span>
                      <span className="detail-value">
                        {doctorData.phoneNumber}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Clinic Address:</span>
                      <span className="detail-value">
                        {doctorData.clinicAddress}
                      </span>
                    </div>
                  </>
                )}
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">
                    {new Date(appointment.dateTime).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                      }
                    )}
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
