import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentMethod,
  setStep,
  selectSelectedProvider,
  selectSelectedDateTime,
} from "../store/features/schedule/scheduleSlice";
import { addAppointment } from "../store/features/appointments/appointmentSlice";
import { Navigate } from "react-router";

const PaymentConfirmation = () => {
  const dispatch = useDispatch();
  const provider = useSelector(selectSelectedProvider);
  const dateTime = useSelector(selectSelectedDateTime);

  const [paymentMethod, setPaymentMethod] = useState("insurance");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const validateCardDetails = () => {
    const newErrors = {};
    
    // Remove all spaces and non-digit characters for validation
    const cleanCardNumber = cardDetails.number.replace(/\D/g, '');
    
    // Card number validation
    if (!cleanCardNumber || cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      newErrors.number = "Please enter a valid card number (13-19 digits)";
    }

    // Expiry date validation
    if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = "Please enter a valid expiry date (MM/YY)";
    } else {
      // Additional expiry date validation
      const [month, year] = cardDetails.expiry.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of year
      const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiry = "Invalid month";
      } else if (parseInt(year) < currentYear || 
                (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiry = "Card has expired";
      }
    }

    // CVV validation
    if (!cardDetails.cvv || !/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = "Please enter a valid CVV (3-4 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    let formatted = '';
    
    // Add space after every 4 digits
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += value[i];
    }
    
    setCardDetails(prev => ({
      ...prev,
      number: formatted
    }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    setCardDetails(prev => ({
      ...prev,
      expiry: value
    }));
  };

  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardDetails(prev => ({
      ...prev,
      cvv: value
    }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "card" && !validateCardDetails()) {
      return;
    }

    if (!provider || !dateTime) {
      console.error("Missing provider or date/time information");
      return;
    }

    const appointmentDate = new Date(dateTime.date);
    if (isNaN(appointmentDate.getTime())) {
      console.error("Invalid date format");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      providerId: provider.id,
      title: `Appointment with ${provider.name}`,
      date: appointmentDate.toISOString().split("T")[0],
      time: dateTime.time,
      status: "confirmed",
      type: provider.specialty,
      location: "Main Clinic",
    };

    // Correct dispatch - remove the arrow function wrapper
    dispatch(addAppointment(newAppointment));

    const paymentData = {
      method: paymentMethod,
      card:
        paymentMethod === "card"
          ? {
              last4: cardDetails.number.slice(-4),
              expiry: cardDetails.expiry,
            }
          : null,
    };
    dispatch(setStep(4));

    dispatch(setPaymentMethod(paymentMethod));
    console.log("hi");

    dispatch(setStep(4));
  };

  const formatDisplayDate = (date) => {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) return "Invalid date";
      return dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      console.error("Date formatting error:", e);
      return "Invalid date";
    }
  };

  if (!provider || !dateTime) {
    return (
      <div className="error-message">
        Missing appointment information. Please start over.
      </div>
    );
  }
  return (
    <div className="payment-confirmation">
      <div className="appointment-summary">
        <h2>Appointment Summary</h2>
        <div className="summary-item">
          <span>Provider:</span>
          <span>
            {provider.name} ({provider.specialty})
          </span>
        </div>
        <div className="summary-item">
          <span>Date & Time:</span>
          <span>
            {formatDisplayDate(dateTime.date)} at {dateTime.time}
          </span>
        </div>
        <div className="summary-item">
          <span>Duration:</span>
          <span>30 minutes</span>
        </div>
        <div className="summary-item total">
          <span>Total:</span>
          <span>$150.00</span>
        </div>
      </div>

      <div className="payment-methods">
        <h2>Payment Method</h2>
        <div className="method-options">
          <label
            className={`method-option ${
              paymentMethod === "insurance" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === "insurance"}
              onChange={() => setPaymentMethod("insurance")}
            />
            <span>Insurance (Co-pay may apply)</span>
          </label>

          <label
            className={`method-option ${
              paymentMethod === "card" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <span>Credit/Debit Card</span>
          </label>
        </div>

        {paymentMethod === "card" && (
          <div className="card-details">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={handleCardNumberChange}
                maxLength={19} // 16 digits + 3 spaces
              />
              {errors.number && <span className="error">{errors.number}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiration Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={handleExpiryChange}
                  maxLength={5}
                />
                {errors.expiry && <span className="error">{errors.expiry}</span>}
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={handleCVVChange}
                  maxLength={4}
                />
                {errors.cvv && <span className="error">{errors.cvv}</span>}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="action-buttons">
        <button className="btn primary" onClick={handlePaymentSubmit}>
          Confirm and Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
