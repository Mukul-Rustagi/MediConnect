import React, { useState } from "react";
import Calendar from "react-calendar";
import { format } from "../utils/dateUtils"; // Import format from date-fns
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedProvider,
  selectAvailableDates,
  selectAvailableTimes,
  selectIsDateAvailable,
  selectDateTime,
  setStep,
} from "../store/features/schedule/scheduleSlice";

const DateTimeSelection = () => {
  const dispatch = useDispatch();
  const provider = useSelector(selectSelectedProvider);
  const availableDates = useSelector(selectAvailableDates);
  const availableTimes = useSelector(selectAvailableTimes);

  // Add missing state variables
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  // Add the missing formatDate function
  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const formatTimeDisplay = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    return hour >= 12
      ? `${hour > 12 ? hour - 12 : hour}:${minutes} PM`
      : `${hour}:${minutes} AM`;
  };

  const handleContinue = () => {
    if (selectedTime) {
      const appointmentDate = formatDate(date);
      dispatch(
        selectDateTime({
          date: appointmentDate,
          time: selectedTime,
          displayDate: format(date, "MMMM d, yyyy"),
          displayTime: formatTimeDisplay(selectedTime),
        })
      );
      dispatch(setStep(3));
    }
  };

  const isAvailable = (date) => {
    const dateString = formatDate(date);
    return availableDates.includes(dateString);
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return !isAvailable(date);
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return isAvailable(date) ? "available-date" : "unavailable-date";
    }
    return null;
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedTime(null);
  };

  return (
    <div className="datetime-selection">
      <div className="provider-summary">
        <img src={provider.image} alt={provider.name} />
        <div>
          <h2>{provider.name}</h2>
          <p>{provider.specialty}</p>
        </div>
      </div>

      <div className="calendar-container">
        <h3>Select a date and time</h3>
        <div className="month-navigation">
          <button
            onClick={() => setMonth((prev) => (prev > 0 ? prev - 1 : 11))}
          >
            &lt;
          </button>
          <h4>
            {new Date(year, month).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h4>
          <button
            onClick={() => setMonth((prev) => (prev < 11 ? prev + 1 : 0))}
          >
            &gt;
          </button>
        </div>

        <Calendar
          onChange={handleDateChange}
          value={date}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          minDetail="month"
          prev2Label={null}
          next2Label={null}
          view="month"
          activeStartDate={new Date(year, month, 1)}
          onActiveStartDateChange={({ activeStartDate }) => {
            setMonth(activeStartDate.getMonth());
            setYear(activeStartDate.getFullYear());
          }}
        />

        {isAvailable(date) && (
          <div className="time-selection">
            <h4>Available times for {date.toLocaleDateString()}</h4>
            <div className="time-slots">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`time-slot ${
                    selectedTime === time ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {formatTimeDisplay(time)}
                </button>
              ))}
            </div>
          </div>
        )}

        {!isAvailable(date) && (
          <p className="no-availability">No availability on this date</p>
        )}
      </div>

      <div className="action-buttons">
        <button
          className="btn primary"
          disabled={!selectedTime}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DateTimeSelection;
