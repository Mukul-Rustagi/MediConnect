import React, { useState } from "react";
import "../styles/MedicalPage.css";
import ProviderSelection from "./ProviderSelection";
import DateTimeSelection from "./DateTimeSelection";
import PaymentConfirmation from "./PaymentConfirmation";
import AppointmentConfirmed from "./AppointmentConfirmed";
import {
  selectCurrentStep,
  selectSelectedProvider,
  selectSelectedDateTime,
  selectPaymentMethod,
  resetSchedule,
  setStep, // Add this import
} from "../store/features/schedule/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";
const ScheduleAppointment = ({ onBack }) => {
  const dispatch = useDispatch();
  const step = useSelector(selectCurrentStep);
  const selectedProvider = useSelector(selectSelectedProvider);
  const selectedDateTime = useSelector(selectSelectedDateTime);
  const paymentMethod = useSelector(selectPaymentMethod);
  const handleBack = () => {
    if (step === 1) {
      dispatch(resetSchedule());
      onBack();
    } else {
      dispatch(setStep(step - 1));
    }
  };

  return (
    <div className="medical-page">
      <header className="page-header">
        <h1>Schedule an appointment</h1>
        {step !== 1 && (
          <button className="btn secondary" onClick={handleBack}>
            Back
          </button>
        )}
      </header>

      <div className="appointment-flow">
        {step === 1 && <ProviderSelection />}
        {step === 2 && <DateTimeSelection />}
        {step === 3 && <PaymentConfirmation />}
        {step === 4 && <AppointmentConfirmed onComplete={onBack} />}
      </div>
    </div>
  );
};

export default ScheduleAppointment;
