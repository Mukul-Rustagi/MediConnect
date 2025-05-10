import React, { useState } from "react";

const AppointmentConfirmed = ({
  provider,
  dateTime,
  paymentMethod,
  onComplete,
}) => {
  const [email, setEmail] = useState("");
  const [sendReminder, setSendReminder] = useState(true);

  return (
    <div className="appointment-confirmed">
      <div className="confirmation-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h2>Your appointment is confirmed</h2>
        <p>You will receive an email with your appointment details</p>
      </div>

      <div className="appointment-details">
        <h3>Appointment Details</h3>
        <div className="detail-item">
          <span>Date & Time:</span>
          <span>
            {dateTime.date.toLocaleDateString()}, {dateTime.time}
          </span>
        </div>
        <div className="detail-item">
          <span>Provider:</span>
          <span>
            {provider.name}, {provider.specialty}
          </span>
        </div>
        <div className="detail-item">
          <span>Location:</span>
          <span>1234 Health St, San Francisco</span>
        </div>
        <div className="detail-item">
          <span>Amount:</span>
          <span>$150.00</span>
        </div>
        <div className="detail-item">
          <span>Payment Method:</span>
          <span>
            {paymentMethod.method === "insurance"
              ? "Insurance (Co-pay)"
              : "Credit Card ending in ••••" +
                paymentMethod.card.number.slice(-4)}
          </span>
        </div>
      </div>

      <div className="email-notification">
        <h3>Email Notification</h3>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label className="checkbox-option">
          <input
            type="checkbox"
            checked={sendReminder}
            onChange={() => setSendReminder(!sendReminder)}
          />
          <span>Send me a reminder</span>
        </label>
      </div>

      <div className="action-buttons">
        <button className="btn primary" onClick={onComplete}>
          Done
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmed;
