import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentMethod,
  setStep,
} from "../store/features/schedule/scheduleSlice";
import { addAppointment } from "../store/features/appointments/appointmentSlice";

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

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(),
      providerId: provider.id,
      title: `Appointment with ${provider.name}`,
      date: dateTime.date.toISOString().split("T")[0],
      time: dateTime.time,
      status: "confirmed",
      type: provider.specialty,
      location: "Main Clinic",
    };

    dispatch(addAppointment(newAppointment));
    dispatch(
      setPaymentMethod({
        method: paymentMethod,
        card: paymentMethod === "card" ? cardDetails : null,
      })
    );
    dispatch(setStep(4));
  };

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
            {dateTime.date.toLocaleDateString()} at {dateTime.time}
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
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiration Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
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
