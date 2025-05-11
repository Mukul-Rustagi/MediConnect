import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import SquarePaymentButton from "./PayPalButton";
import { jwtDecode } from "jwt-decode";

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
    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
    "6:00 PM", "7:00 PM"
  ];

  // Get user and token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser({ id: decoded.id, email: decoded.email });
        setToken(storedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
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
          .map((a) => new Date(a.dateTime).toDateString());

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
    for (let d = 1; d <= totalDays; d++) days.push(new Date(year, month, d));

    setCalendarDays(days);
  }, []);

  const handleDayClick = (date) => {
    const strDate = date.toDateString();
    if (!bookedDates.includes(strDate)) {
      setSelectedDate(date);
      setShowConfirmation(false); // Reset confirmation on new date selection
    }
  };

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
    setShowConfirmation(true); // Show confirmation once a time slot is selected
  };

  const getBookedTimesForSelectedDate = () => {
    if (!selectedDate) return [];

    return appointments
      .filter(
        (a) =>
          a.doctorId === id &&
          new Date(a.dateTime).toDateString() === selectedDate.toDateString()
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
    // You can add additional success handling here
    console.log('Payment successful:', data);
  };

  const handlePaymentError = (error) => {
    setPaymentError(error.message || 'Payment failed. Please try again.');
    setPaymentSuccess(false);
    console.error('Payment error:', error);
  };

  // Render individual day buttons
  const renderDay = (date, idx) => {
    if (!date) return <div key={idx} className="col p-2" />;

    const isBooked = bookedDates.includes(date.toDateString());
    const isSelected = selectedDate?.toDateString() === date.toDateString();

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
    <div className="container my-4 p-4 border rounded shadow-sm bg-white">
      <h4 className="text-center mb-4">{monthYear}</h4>

      <div className="row fw-bold text-center border-bottom pb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div className="col" key={d}>{d}</div>
        ))}
      </div>

      <div className="row flex-wrap text-center mt-2">
        {calendarDays.map((date, idx) => renderDay(date, idx))}
      </div>

      {selectedDate && !showConfirmation && (
        <div className="mt-4">
          <h5 className="text-center">
            Available Time Slots for {selectedDate.toDateString()}
          </h5>
          <div className="row text-center mt-3">
            {timeSlots.map((slot) => {
              const isBooked = bookedTimes.includes(slot);
              return (
                <div key={slot} className="col-6 col-md-3 p-2">
                  <button
                    className={`btn w-100 ${isBooked ? "btn-danger" : "btn-outline-success"}`}
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

      {/* Show confirmation button when time is selected */}
      {showConfirmation && (
        <div className="mt-4 text-center">
          <h5>Confirm your appointment</h5>
          <p>
            You have selected: {selectedDate.toDateString()} at {selectedTime}
          </p>
          <button
            className="btn btn-success w-50"
            onClick={() => setShowConfirmation(false)}
          >
            Confirm Appointment
          </button>

          {/* Display Square Payment Button */}
          <div className="mt-3">
            {user && token ? (
              <SquarePaymentButton 
                amount={1}
                user={user}
                token={token}
                appointmentData={{
                  doctorId: id,
                  date: selectedDate.toISOString().split('T')[0],
                  time: selectedTime
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
