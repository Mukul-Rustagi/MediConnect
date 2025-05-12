import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import SquarePaymentButton from "./PayPalButton";
import { jwtDecode } from "jwt-decode";
import "../styles/DateTimeSelection.css";

const DateTimeSelection = ({ id }) => {
  const [calendarDays, setCalendarDays] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const today = new Date();

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ];

  // Get user and token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser({ id: decoded.id, email: decoded.email });
        setToken(storedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Fetch all appointments
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("appointment");
        const all = response.data.data;

        setAppointments(all);

        const doctorBookedDates = all
          .filter((a) => a.doctorId === id)
          .map((a) => {
            const date = new Date(a.dateTime);
            return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
          });

        setBookedDates(doctorBookedDates);
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    })();
  }, [id]);

  // Generate calendar days
  useEffect(() => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDayIndex; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);
      if (date >= today) {
        // Only add future dates
        days.push(date);
      } else {
        days.push(null);
      }
    }

    setCalendarDays(days);
  }, []);

  const handleDayClick = (date) => {
    if (!date) return;

    const dateStr = date.toISOString().split("T")[0];
    if (!bookedDates.includes(dateStr)) {
      setSelectedDate(date);
      setShowConfirmation(false);
      setSelectedTime(null);
    }
  };

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
    setShowConfirmation(true);
  };

  const getBookedTimesForSelectedDate = () => {
    if (!selectedDate) return [];

    const dateStr = selectedDate.toISOString().split("T")[0];
    return appointments
      .filter(
        (a) =>
          a.doctorId === id &&
          new Date(a.dateTime).toISOString().split("T")[0] === dateStr
      )
      .map((a) => {
        const t = new Date(a.dateTime);
        return t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      });
  };

  const monthYear = today.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const bookedTimes = getBookedTimesForSelectedDate();

  const handlePaymentSuccess = (data) => {
    setPaymentSuccess(true);
    setPaymentError(null);
    console.log("Payment successful:", data);
  };

  const handlePaymentError = (error) => {
    setPaymentError(error.message || "Payment failed. Please try again.");
    setPaymentSuccess(false);
    console.error("Payment error:", error);
  };

  // Render individual day buttons
  const renderDay = (date, idx) => {
    if (!date) return <div key={idx} className="col p-2" />;

    const dateStr = date.toISOString().split("T")[0];
    const isBooked = bookedDates.includes(dateStr);
    const isSelected = selectedDate?.toISOString().split("T")[0] === dateStr;

    let btnClass = "btn w-100 ";
    if (isBooked) btnClass += "btn-danger";
    else if (isSelected) btnClass += "btn-success";
    else btnClass += "btn-outline-primary";

    return (
      <div key={idx} className="col p-2">
        <button
          className={btnClass}
          disabled={isBooked}
          onClick={() => handleDayClick(date)}
        >
          {date.getDate()}
        </button>
      </div>
    );
  };

  return (
    <div className="datetime-selection-container">
      <div className="calendar-section">
        <h4 className="text-center mb-4">{monthYear}</h4>

        <div className="row fw-bold text-center border-bottom pb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div className="col" key={d}>
              {d}
            </div>
          ))}
        </div>

        <div className="row flex-wrap text-center mt-2">
          {calendarDays.map((date, idx) => renderDay(date, idx))}
        </div>
      </div>

      {selectedDate && !showConfirmation && (
        <div className="time-slots-section">
          <h5 className="text-center">
            Available Time Slots for {selectedDate.toLocaleDateString()}
          </h5>
          <div className="row text-center mt-3">
            {timeSlots.map((slot) => {
              const isBooked = bookedTimes.includes(slot);
              return (
                <div key={slot} className="col-6 col-md-3 p-2">
                  <button
                    className={`btn w-100 ${
                      isBooked ? "btn-danger" : "btn-outline-success"
                    }`}
                    disabled={isBooked}
                    onClick={() => !isBooked && handleTimeSlotClick(slot)}
                  >
                    {slot}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-section">
          <h5>Confirm your appointment</h5>
          <p>
            You have selected: {selectedDate.toLocaleDateString()} at{" "}
            {selectedTime}
          </p>
          <button
            className="btn btn-success w-50"
            onClick={() => setShowConfirmation(false)}
          >
            Confirm Appointment
          </button>

          <div className="payment-section mt-3">
            {user && token ? (
              <SquarePaymentButton
                amount={1}
                user={user}
                token={token}
                appointmentData={{
                  doctorId: id,
                  date: selectedDate.toISOString().split("T")[0],
                  time: selectedTime,
                }}
              />
            ) : (
              <div className="alert alert-warning">
                Please log in to proceed with payment
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelection;