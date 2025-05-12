import React, { useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaNotesMedical,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaIdCard,
} from "react-icons/fa";

const PatientCard = ({ patient }) => {
  const [showModal, setShowModal] = useState(false);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <div className="patient-card" onClick={toggleModal}>
        <div className="patient-header">
          <div className="patient-avatar">
            {patient.avatar ? (
              <span>{patient.avatar}</span>
            ) : (
              <span>{getInitials(patient.name)}</span>
            )}
          </div>
          <div className="patient-info">
            <h3 className="patient-name">{patient.name}</h3>
            <p className="patient-meta">
              Last Visit: {patient.lastVisit || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <PatientDetailsModal patient={patient} onClose={toggleModal} />
      )}
    </>
  );
};

const PatientDetailsModal = ({ patient, onClose }) => {
  return (
    <div className="patient-modal-overlay">
      <div className="patient-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <div className="patient-avatar large">
            {patient.avatar ? (
              <span>{patient.avatar}</span>
            ) : (
              <span>
                {patient.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </div>
          <div className="patient-title">
            <h2>{patient.name}</h2>
            <p className="patient-id">
              <FaIdCard /> ID: {patient.id}
            </p>
          </div>
        </div>

        <div className="modal-content">
          <div className="patient-details-grid">
            <div className="detail-card">
              <h3>
                <FaCalendarAlt /> Last Visit
              </h3>
              <p>{patient.lastVisit || "No visits recorded"}</p>
            </div>

            <div className="detail-card">
              <h3>
                <FaCalendarAlt /> Next Appointment
              </h3>
              <p>{patient.nextAppointment || "Not scheduled"}</p>
            </div>

            {patient.phone && (
              <div className="detail-card">
                <h3>
                  <FaPhone /> Contact
                </h3>
                <p>{patient.phone}</p>
                {patient.email && (
                  <p>
                    <FaEnvelope /> {patient.email}
                  </p>
                )}
              </div>
            )}

            {patient.notes && (
              <div className="detail-card full-width">
                <h3>
                  <FaNotesMedical /> Medical Notes
                </h3>
                <p>{patient.notes}</p>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button className="btn primary">Start Consultation</button>
            <button className="btn outline">View Full History</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
