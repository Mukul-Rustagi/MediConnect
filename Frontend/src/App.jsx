// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import HealthcareCover from "./components/Cover";
import Signup from "./components/SignUp";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HealthcareCover />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/profile/doctor/:id" element={<ProfilePage />} />
          <Route path="/profile/patient/:id" element={<ProfilePage  isDoctorView = {false}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
