import React, { useState,useEffect } from "react";
import axios from 'axios';
import "../styles/MedicalPage.css";
const ProfilePage = ({ isDoctorView = true }) => {
  let decodedToken="";
    useEffect(()=>{
      (async function(){
        const token = localStorage.getItem('token');
        console.log(token);
        const userData = await axios.get('http://localhost:5000/api/user/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
        console.log(userData);
      })();
    },[]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    dateOfBirth: "1985-05-15",
    gender: "male",
    bloodType: "A+",
    allergies: "Penicillin, Peanuts",
    conditions: "Hypertension",
    medications: "Lisinopril 10mg daily",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    // Here you would typically save to API
  };

  return (
    <div className="medical-page profile-page">
      <header className="page-header">
        <h1>My Profile</h1>
        <div className="action-buttons">
          {!editMode ? (
            <button className="btn primary" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          ) : (
            <>
              <button className="btn" onClick={handleSubmit}>
                Save Changes
              </button>
              <button
                className="btn secondary"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </header>

      <div className="profile-content">
        <div className="profile-section profile-header">
          <div className="profile-avatar">
            {formData.firstName.charAt(0)}
            {formData.lastName.charAt(0)}
          </div>
          <div className="profile-info">
            <h2>
              {formData.firstName} {formData.lastName}
            </h2>
            <p>{isDoctorView ? "Cardiologist" : "Patient since 2020"}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Personal Information</h3>
          {editMode ? (
            <form className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </form>
          ) : (
            <div className="profile-info-grid">
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{formData.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">{formData.phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address</span>
                <span className="info-value">{formData.address}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date of Birth</span>
                <span className="info-value">
                  {new Date(formData.dateOfBirth).toLocaleDateString()} (Age:{" "}
                  {new Date().getFullYear() -
                    new Date(formData.dateOfBirth).getFullYear()}
                  )
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Gender</span>
                <span className="info-value">
                  {formData.gender.charAt(0).toUpperCase() +
                    formData.gender.slice(1)}
                </span>
              </div>
            </div>
          )}
        </div>

        {!isDoctorView && (
          <div className="profile-section">
            <h3>Medical Information</h3>
            {editMode ? (
              <form className="profile-form">
                <div className="form-group">
                  <label>Blood Type</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Allergies</label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    rows="2"
                  />
                </div>

                <div className="form-group">
                  <label>Medical Conditions</label>
                  <textarea
                    name="conditions"
                    value={formData.conditions}
                    onChange={handleChange}
                    rows="2"
                  />
                </div>

                <div className="form-group">
                  <label>Current Medications</label>
                  <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleChange}
                    rows="2"
                  />
                </div>
              </form>
            ) : (
              <div className="profile-info-grid">
                <div className="info-item">
                  <span className="info-label">Blood Type</span>
                  <span className="info-value">{formData.bloodType}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Allergies</span>
                  <span className="info-value">
                    {formData.allergies || "None reported"}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Medical Conditions</span>
                  <span className="info-value">
                    {formData.conditions || "None reported"}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Current Medications</span>
                  <span className="info-value">
                    {formData.medications || "None reported"}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {isDoctorView && (
          <div className="profile-section">
            <h3>Professional Information</h3>
            <div className="profile-info-grid">
              <div className="info-item">
                <span className="info-label">Specialization</span>
                <span className="info-value">Cardiology</span>
              </div>
              <div className="info-item">
                <span className="info-label">License Number</span>
                <span className="info-value">MD12345678</span>
              </div>
              <div className="info-item">
                <span className="info-label">Years of Practice</span>
                <span className="info-value">12</span>
              </div>
              <div className="info-item">
                <span className="info-label">Hospital Affiliation</span>
                <span className="info-value">City General Hospital</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
