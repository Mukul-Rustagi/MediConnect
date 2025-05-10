import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppoinmentsPage from "./AppoinmentsPage";
import MessagesPage from "./MessagesPage";
import DoctorHome from "./DoctorHome";
import DoctorPatients from "./DoctorPatients";
import ProfilePage from "./ProfilePage";

const DoctorView = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DoctorHome />} />
      <Route
        path="/dashboard/appointments"
        element={<AppoinmentsPage isDoctorView={true} />}
      />
      <Route
        path="/dashboard/messages"
        element={<MessagesPage isDoctorView={true} />}
      />
      <Route path="/dashboard/patients" element={<DoctorPatients />} />
      <Route
        path="/dashboard/profile"
        element={<ProfilePage isDoctorView={true} />}
      />

      {/* Optional fallback route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default DoctorView;
