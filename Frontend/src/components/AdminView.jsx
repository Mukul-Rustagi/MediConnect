import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/AdminView.css";

const patients = [
  { id: 1, name: "John Doe", age: 32, condition: "Fever" },
  { id: 2, name: "Jane Smith", age: 28, condition: "Headache" },
  { id: 3, name: "Alice Johnson", age: 45, condition: "Diabetes" },
];

const doctors = [
  { id: 1, name: "Dr. House", specialty: "Diagnostics" },
  { id: 2, name: "Dr. Grey", specialty: "Surgery" },
  { id: 3, name: "Dr. Watson", specialty: "General Physician" },
];

const AdminView = ({ userType }) => {
  return (
    <div className="admin-view">
      <h2>Admin Dashboard</h2>

      <div className="stats-boxes">
        <div className="stat-box">
          <h3>Total Patients</h3>
          <p>{patients.length}</p>
        </div>
        <div className="stat-box">
          <h3>Total Doctors</h3>
          <p>{doctors.length}</p>
        </div>
        <div className="stat-box">
          <h3>Total Appointments</h3>
          <p>30</p>
        </div>
      </div>

      {/* Conditionally render either the doctor grid or patient grid */}
      <div className="grid-section">
        {userType === "doctor" ? (
          <>
            <h3>Doctor's Dashboard</h3>
            <div className="grid">
              {doctors.map((doctor) => (
                <Link key={doctor.id} to={`/profile/doctor/${doctor.id}`} className="card">
                  <h4>{doctor.name}</h4>
                  <p>Specialty: {doctor.specialty}</p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3>Patients</h3>
            <div className="grid">
              {patients.map((patient) => (
                <Link key={patient.id} to={`/profile/patient/${patient.id}`} className="card">
                  <h4>{patient.name}</h4>
                  <p>Age: {patient.age}</p>
                  <p>Condition: {patient.condition}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminView;
