import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { useNavigate } from "react-router";

const Signup = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    allergies: "",
    conditions: "",
    medications: "",
    country: "",
    password: "",
    profilePicture: "",
    meetingFile: ""
  });

  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    experienceYears: "",
    clinicAddress: "",
    availableDays: "",
    timing: "",
    password:""
  });

  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    password: ""
  });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDoctorChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    try {
      let response;
      if (role === "Patient") {
        response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/register`, { ...patientData, role });
        // console.log(response);
        alert(response.data.message);
        if(response.data.message=='User registered successfully.'){
          // console.log(response.data.data.token);
          localStorage.setItem('token',response.data.data.token);
          navigate('/login');
        }
      } else if (role === "Doctor") {
        // console.log("kavya");
        response = await axios.post(`${import.meta.env.VITE_API_URL}/api/doctors/`, { ...doctorData, role });
        // console.log(response);
        alert(response.data.message);
        if(response.data.message=='Doctor created successfully'){
          localStorage.setItem('token',response.data.data.token);
          navigate('/login');
        }
      } else if (role === "Admin") {
        response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/register`, { ...adminData, role });
      }
      // console.log(response);
      // navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  const renderCommonFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="e.g. Jane"
          value={role === "Patient" ? patientData.firstName : 
                role === "Doctor" ? doctorData.firstName : 
                adminData.firstName}
          onChange={role === "Patient" ? handlePatientChange : 
                  role === "Doctor" ? handleDoctorChange : 
                  handleAdminChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="e.g. Smith"
          value={role === "Patient" ? patientData.lastName : 
                role === "Doctor" ? doctorData.lastName : 
                adminData.lastName}
          onChange={role === "Patient" ? handlePatientChange : 
                  role === "Doctor" ? handleDoctorChange : 
                  handleAdminChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="e.g. janesmith@gmail.com"
          value={role === "Patient" ? patientData.email : 
                role === "Doctor" ? doctorData.email : 
                adminData.email}
          onChange={role === "Patient" ? handlePatientChange : 
                  role === "Doctor" ? handleDoctorChange : 
                  handleAdminChange}
          required
        />
      </div>
    </>
  );

  const renderPatientFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="phone">Phone number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="e.g. 1234567890"
          value={patientData.phone}
          onChange={handlePatientChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Your full address"
          value={patientData.address}
          onChange={handlePatientChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={patientData.dateOfBirth}
          onChange={handlePatientChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          value={patientData.gender}
          onChange={handlePatientChange}
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="bloodType">Blood Type</label>
        <input
          type="text"
          id="bloodType"
          name="bloodType"
          placeholder="e.g. O+"
          value={patientData.bloodType}
          onChange={handlePatientChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="allergies">Allergies</label>
        <textarea
          id="allergies"
          name="allergies"
          placeholder="List any allergies"
          value={patientData.allergies}
          onChange={handlePatientChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="conditions">Medical Conditions</label>
        <textarea
          id="conditions"
          name="conditions"
          placeholder="List any medical conditions"
          value={patientData.conditions}
          onChange={handlePatientChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="medications">Current Medications</label>
        <textarea
          id="medications"
          name="medications"
          placeholder="List current medications"
          value={patientData.medications}
          onChange={handlePatientChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          placeholder="e.g. USA"
          value={patientData.country}
          onChange={handlePatientChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Create a password"
          value={patientData.password}
          onChange={handlePatientChange}
          required
        />
      </div>
    </>
  );

  const renderDoctorFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="e.g. 1234567890"
          value={doctorData.phoneNumber}
          onChange={handleDoctorChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          value={doctorData.gender}
          onChange={handleDoctorChange}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="specialization">Specialization</label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          placeholder="e.g. Cardiologist"
          value={doctorData.specialization}
          onChange={handleDoctorChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="experienceYears">Years of Experience</label>
        <input
          type="number"
          id="experienceYears"
          name="experienceYears"
          min="0"
          max="50"
          placeholder="e.g. 10"
          value={doctorData.experienceYears}
          onChange={handleDoctorChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="clinicAddress">Clinic Address</label>
        <textarea
          id="clinicAddress"
          name="clinicAddress"
          placeholder="Full clinic address"
          value={doctorData.clinicAddress}
          onChange={handleDoctorChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input  
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            value={doctorData.password}
            onChange={handleDoctorChange}
            required
        />
        </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="availableDays">Available Days</label>
          <input
            type="text"
            id="availableDays"
            name="availableDays"
            placeholder="e.g. Mon, Wed, Fri"
            value={doctorData.availableDays}
            onChange={handleDoctorChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="timing">Timing</label>
          <input
            type="text"
            id="timing"
            name="timing"
            placeholder="e.g. 10:00 AM - 4:00 PM"
            value={doctorData.timing}
            onChange={handleDoctorChange}
          />
        </div>


        

      </div>
    </>
  );

  const renderAdminFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="phone">Phone number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="e.g. 1234567890"
          value={adminData.phone}
          onChange={handleAdminChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          placeholder="e.g. USA"
          value={adminData.country}
          onChange={handleAdminChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Create a password"
          value={adminData.password}
          onChange={handleAdminChange}
          required
        />
      </div>
    </>
  );

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">MediConnect</h1>
          <h2 className="auth-subtitle">Create an account</h2>
          <p className="auth-description">
            Please provide your details to create an account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                onChange={handleRoleChange}
                value={role}
                required
              >
                <option value="">Select</option>
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {renderCommonFields()}

            {role === "Patient" && renderPatientFields()}
            {role === "Doctor" && renderDoctorFields()}
            {role === "Admin" && renderAdminFields()}

            <button type="submit" className="auth-button">
              Create User
            </button>
          </form>

          <div className="auth-footer">
            <button className="auth-link" onClick={() => navigate("/login")}>
              Already have an account? Log in.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;