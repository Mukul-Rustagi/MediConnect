import React, { useState, useEffect } from "react";
import "../styles/MedicalPage.css";
import ScheduleAppointment from "./ScheduleAppointment.jsx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AppoinmentsPage = ({ isDoctorView }) => {
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [showSchedule, setShowSchedule] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const role = decodedToken.role?.toLowerCase() || "";
    setUserRole(role);

    const fetchAppointments = async () => {
      try {
        let response;
        if (role === "doctor") {
          // Fetch appointments for doctor
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/appointment/${
              decodedToken.id
            }`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          // Fetch appointments for patient
          const patientAppointment = await axios.get(
            `http://localhost:5000/api/appointment/${
              jwtDecode(localStorage.getItem("token")).id
            }`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log(patientAppointment.data.data);
          let userId = jwtDecode(localStorage.getItem("token")).id;
          if (patientAppointment.data) {
            console.log("hi");
            console.log(
              patientAppointment.data.data.filter(
                (item) => item.userId === userId
              )
            );
            setAppointments(
              patientAppointment.data.data.filter(
                (item) => item.userId === userId
              )
            );
          }
          // Fetch user profiles for each appointment
          const profiles = {};
          for (const appointment of response.data.data) {
            try {
              if (role === "doctor") {
                // Fetch patient profile
                const patientResponse = await axios.get(
                  `${import.meta.env.VITE_API_URL}/api/user/profile/${
                    appointment.userId
                  }`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                profiles[appointment.userId] = patientResponse.data.data;
              } else {
                // Fetch doctor profile
                const doctorResponse = await axios.get(
                  `${import.meta.env.VITE_API_URL}/api/doctors/${
                    appointment.doctorId
                  }`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                profiles[appointment.doctorId] = doctorResponse.data.data;
              }
            } catch (error) {
              console.error("Error fetching user profile:", error);
            }
          }
          setUserProfiles(profiles);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);
  const filteredAppointments = appointments;
  console.log(filteredAppointments);
  const getUserName = (appointment) => {
    if (userRole === "doctor") {
      const patientData = userProfiles[appointment.userId];
      return patientData
        ? `${patientData.firstName} ${patientData.lastName}`
        : "Loading...";
    } else {
      const doctorData = userProfiles[appointment.doctorId];
      return doctorData
        ? `Dr. ${doctorData.firstName} ${doctorData.lastName}`
        : "Loading...";
    }
  };

  const getUserDetails = (appointment) => {
    if (userRole === "doctor") {
      const patientData = userProfiles[appointment.userId];
      if (!patientData) return null;
      return {
        email: patientData.email,
        phone: patientData.phone,
        address: patientData.address,
        dateOfBirth: patientData.dateOfBirth,
        gender: patientData.gender,
        bloodType: patientData.bloodType,
        allergies: patientData.allergies,
        medications: patientData.medications,
        conditions: patientData.conditions,
        country: patientData.country,
        profilePicture: patientData.profilePicture,
      };
    } else {
      const doctorData = userProfiles[appointment.doctorId];
      if (!doctorData) return null;
      return {
        specialization: doctorData.specialization,
        phoneNumber: doctorData.phoneNumber,
        email: doctorData.email,
        address: doctorData.address,
        gender: doctorData.gender,
        profilePicture: doctorData.profilePicture,
      };
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="medical-page">
      {showSchedule ? (
        <ScheduleAppointment onBack={() => setShowSchedule(false)} />
      ) : (
        <>
          <header className="page-header">
            <h1>Appointments</h1>
            {!isDoctorView && userRole === "patient" && (
              <div className="action-buttons">
                <button
                  className="btn primary"
                  onClick={() => setShowSchedule(true)}
                >
                  + New Appointment
                </button>
              </div>
            )}
          </header>

          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Appointments
            </button>
            <button
              className={`filter-tab ${
                activeFilter === "upcoming" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("upcoming")}
            >
              Upcoming
            </button>
          </div>

          <div className="appointments-list">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => {
                const userDetails = appointment;
                return (
                  <div
                    key={appointment._id}
                    className={`appointment-card ${appointment.status}`}
                  >
                    {console.log(userDetails)}
                    <div className="appointment-main">
                      <h3>{appointment.reason || "Medical Consultation"}</h3>

                      {userDetails && (
                        <>
                          {userRole === "doctor" ? (
                            <>
                              <p className="appointment-meta">
                                <span className="label">With:</span>{" "}
                                {userDetails.userId.firstName +
                                  " " +
                                  userDetails.userId.lastName}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Email:</span>{" "}
                                {userDetails.userId.email}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Phone:</span>{" "}
                                {userDetails.userId.phone}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Address:</span>{" "}
                                {userDetails.userId.address}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Gender:</span>{" "}
                                {userDetails.userId.gender}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Blood Type:</span>{" "}
                                {userDetails.userId.bloodType}
                              </p>
                              {userDetails.profilePicture && (
                                <div className="profile-picture">
                                  <img
                                    src={userDetails.profilePicture}
                                    alt="Profile"
                                  />
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <p className="appointment-meta">
                                <span className="label">With:</span>{" "}
                                {userDetails.doctorId.firstName +
                                  " " +
                                  userDetails.doctorId.lastName}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Specialization:</span>{" "}
                                {userDetails.doctorId.specialization}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Contact:</span>{" "}
                                {userDetails.doctorId.phoneNumber}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Email:</span>{" "}
                                {userDetails.doctorId.email}
                              </p>
                              {/* <p className="appointment-meta">
                                <span className="label">Address:</span>{" "}
                                {userDetails.doctorId.address}
                              </p> */}
                              <p className="appointment-meta">
                                <span className="label">Gender:</span>{" "}
                                {userDetails.doctorId.gender}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Location:</span>{" "}
                                {userDetails.doctorId.clinicAddress || "Clinic"}
                              </p>
                              {userDetails.profilePicture && (
                                <div className="profile-picture">
                                  <img
                                    src={userDetails.doctorId.profilePicture}
                                    alt="Profile"
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </>
                      )}
                      <p className="appointment-meta">
                        <span className="label">When:</span>{" "}
                        {new Date(appointment.dateTime).toLocaleDateString()}
                      </p>
                      {/* <p className="appointment-meta">
                        <span className="label">Type:</span>{" "}
                        {appointment.type || "Regular Checkup"}
                      </p> */}
                    </div>
                    <div className="appointment-actions">
                      <span className={`status-badge ${appointment.status}`}>
                        {appointment.status}
                      </span>
                      {userRole === "doctor" &&
                        appointment.status === "pending" && (
                          <div className="action-buttons">
                            <button className="btn small">Confirm</button>
                            <button className="btn small secondary">
                              Reschedule
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-state">
                <p>No {activeFilter} appointments found</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AppoinmentsPage;
