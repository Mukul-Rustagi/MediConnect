import { useState,useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import HealthcareCover from "./components/Cover";
import Signup from "./components/SignUp";
import PatientHome from "./components/PatientHome";
import MessagesPage from "./components/MessagesPage";
import ProfilePage from "./components/ProfilePage";
import PatientPrescription from "./components/PatientPrescription";
import PatientHealthRecords from "./components/PatientHealthRecords";
import PatientsLabs from "./components/PatientsLabs";
import PatientBilling from "./components/PatientBilling";
import DashboardLayout from "./components/DashboardLayout";
import AppoinmentsPage from "./components/AppoinmentsPage";
import patientData from "./Data/PatientData";
import DoctorView from "./components/DoctorView";
import DoctorHome from "./components/DoctorHome";
import { jwtDecode } from "jwt-decode";
// import useEffect from


function App() {
  
  const [user, setUser] = useState(null); // null until token is processed
  
  useEffect(() => {
    // localStorage.removeItem("token");
    // localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjEzMWU0ZDEyZGMwNzU1MDJhM2Y4ZCIsImVtYWlsIjoia2F2QGdtYWlsLmNvbSIsInJvbGUiOiJQYXRpZW50IiwiaWF0IjoxNzQ3MDA3OTk3LCJleHAiOjE3NDc2MTI3OTd9.T7qMdOqqWQTxAtVjhpoDNtlL6YDm2wP-Fz1qI9CopUU')
    const token = localStorage.getItem("token")||"";
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded.role, decoded.id, decoded.email);
        setUser({ type: decoded.role, id: decoded.id, email: decoded.email });
      } catch (err) {
        console.error("Invalid token", err);
        setUser(null);
      }
    }
  }, []);

  const {
    name = "Patient",
    upcomingAppointments = [],
    messages = [],
    prescriptions = [],
    billing = {},
  } = patientData || {};

  const summaryData = {
    upcomingAppointments: upcomingAppointments.length,
    unreadMessages: messages.filter((msg) => msg.unread).length,
    activePrescriptions: prescriptions.filter((rx) => rx.status === "active")
      .length,
    totalBillsDue: billing.totalDue || 0,
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HealthcareCover />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {user?.type == "Patient" ? (
          <Route
            path="/dashboard"
            element={
              <DashboardLayout userType={user.type} summaryData={summaryData} />
            }
          >
            <Route index element={<PatientHome summaryData={summaryData} />} />
            <Route path="appointments" element={<AppoinmentsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route
              path="profile"
              element={<ProfilePage isDoctorView={false} />}
            />

            <Route path="prescriptions" element={<PatientPrescription />} />
            <Route path="labs" element={<PatientsLabs />} />
            <Route path="health-records" element={<PatientHealthRecords />} />
            <Route path="billing" element={<PatientBilling />} />
          </Route>
        ) : (
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DoctorHome />} />
            <Route
              path="appointments"
              element={<AppoinmentsPage isDoctorView={true} />}
            />
            <Route
              path="messages"
              element={<MessagesPage isDoctorView={true} />}
            />
            <Route
              path="profile"
              element={<ProfilePage isDoctorView={true} />}
            />
          </Route>
        )}
        <Route path="/patient/home" element={<PatientHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
