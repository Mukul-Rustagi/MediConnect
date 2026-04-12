import React, { useState, useEffect } from "react";
import {
  FaUserMd,
  FaGraduationCap,
  FaClock,
  FaSearch,
  FaFilter,
  FaStar,
  FaHospital,
} from "react-icons/fa";
import DateTimeSelection from "./DateTimeSelection";
import "../styles/ScheduleAppointment.css";
import axios from "axios";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";

const ScheduleAppointment = ({ onBack = () => {} }) => {
  const [allDoctorsView, set_allDoctorsView] = useState(true);
  const [particularDoctor, set_particularDoctor] = useState(false);
  const [id, setid] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.get("http://localhost:5000/api/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response.data); // Debug log

        // Check if response.data is an array or has a data property
        const doctorsData = Array.isArray(response.data)
          ? response.data
          : response.data.data
          ? response.data.data
          : response.data.doctors
          ? response.data.doctors
          : [];

        if (!Array.isArray(doctorsData)) {
          throw new Error("Invalid data format received from server");
        }

        // Transform the backend data to match our frontend structure
        const formattedDoctors = doctorsData.map((doctor) => ({
          _id: doctor._id,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          displayName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
          specialization: doctor.specialization,
          experienceYears: doctor.experienceYears,
          avatar: `${doctor.firstName?.[0] || ""}${
            doctor.lastName?.[0] || ""
          }`.toUpperCase(),
          rating: doctor.rating || 4.5,
          hospital: doctor.hospital || "General Hospital",
          education: doctor.education || "MD",
          languages: doctor.languages || ["English"],
          consultationFee: doctor.consultationFee || 150,
        }));

        setDoctors(formattedDoctors);
        setLoading(false);
      } catch (err) {
        console.error("Full error object:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch doctors. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specializations = [
    ...new Set(doctors.map((doctor) => doctor.specialization)),
  ];

  const handleDoctorSelect = (doctor) => {
    set_allDoctorsView(false);
    set_particularDoctor(true);
    setid(doctor._id);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const full = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
    const matchesSearch =
      full.includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization =
      !selectedSpecialization ||
      doctor.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="schedule-container">
      {allDoctorsView && (
        <>
          <div className="schedule-toolbar">
            <button
              type="button"
              className="schedule-back-link"
              onClick={onBack}
            >
              ← Back to appointments
            </button>
          </div>
          <h2 className="section-title">Find your doctor</h2>
          <p className="section-subtitle">
            Search by name or specialty, then book a time that works for you.
          </p>

          <div className="search-filter-container">
            <div className="custom-form-container" style={{ flex: 1 }}>
              <CustomInput
                icon={FaSearch}
                type="text"
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="custom-form-container filter-box">
              <CustomSelect
                icon={FaFilter}
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </CustomSelect>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading doctors...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
            </div>
          ) : (
            <div className="doctors-grid">
              {filteredDoctors.map((doctor) => (
                <div key={doctor._id} className="doctor-card">
                  <div className="doctor-avatar" aria-hidden>
                    {doctor.avatar || <FaUserMd />}
                  </div>
                  <h3 className="doctor-name">{doctor.displayName}</h3>
                  <span className="doctor-specialization">
                    {doctor.specialization}
                  </span>
                  <div className="doctor-rating">
                    <FaStar className="star-icon" />
                    <span>{doctor.rating}</span>
                  </div>
                  <div className="doctor-experience">
                    <FaClock /> <span>{doctor.experienceYears} years</span> of
                    experience
                  </div>
                  <div className="doctor-hospital">
                    <FaHospital /> {doctor.hospital}
                  </div>
                  <div className="doctor-education">
                    <FaGraduationCap /> {doctor.education}
                  </div>
                  <div className="doctor-languages">
                    {doctor.languages.map((lang, index) => (
                      <span key={index} className="language-tag">
                        {lang}
                      </span>
                    ))}
                  </div>
                  <div className="doctor-fee">
                    Consultation Fee: ${doctor.consultationFee}
                  </div>
                  <button
                    className="doctor-select-btn"
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {particularDoctor && (
        <div className="datetime-selection-container">
          <div className="schedule-toolbar">
            <button
              type="button"
              className="schedule-back-link"
              onClick={() => {
                set_allDoctorsView(true);
                set_particularDoctor(false);
                setid("");
              }}
            >
              ← Back to doctor list
            </button>
          </div>
          <h2 className="section-title">Schedule appointment</h2>
          <p className="section-subtitle">
            Pick a date and time for your visit.
          </p>
          <DateTimeSelection id={id} />
        </div>
      )}
    </div>
  );
};

export default ScheduleAppointment;