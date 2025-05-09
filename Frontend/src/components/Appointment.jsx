import React from "react";

const AppointmentCard = ({ appointment, isDoctorView = false }) => {
  return (
    <div className="card appointment-card appointment-home-card">
      <h3>{appointment.title}</h3>
      <p className="appointment-meta">
        {isDoctorView
          ? `Patient: ${appointment.patient}`
          : `Doctor: ${appointment.doctor}`}
      </p>
      <p className="appointment-meta">
        {appointment.date} at {appointment.time}
      </p>
      <p className="appointment-meta">Location: {appointment.location}</p>
      <div className="card-actions">
        <button className="btn btn-primary">View Details</button>
        <button className="btn btn-secondary">Reschedule</button>
      </div>
    </div>
  );
};

export default AppointmentCard;
