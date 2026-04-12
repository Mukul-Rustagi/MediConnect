import React, { useState, useEffect } from "react";
import "../styles/MedicalPage.css";
import ScheduleAppointment from "./ScheduleAppointment.jsx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

/** Normalize Mongo refs / strings to a single string id for maps and API URLs */
const refId = (ref) => {
  if (ref == null) return null;
  if (typeof ref === "object" && ref._id != null) return String(ref._id);
  return String(ref);
};

const AppointmentsPage = ({ isDoctorView }) => {
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
    const role = decodedToken.role?.toLowerCase() || "";
    setUserRole(role);
    const userId = decodedToken.id;

    const fetchAppointments = async () => {
      try {
        let response;
        if (role === "doctor") {
          // Fetch appointments for doctor
          response = await axios.get(
            `http://localhost:5000/api/appointment/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setAppointments(response.data.data || []);
        } else {
          // Fetch appointments for patient
          response = await axios.get(
            `http://localhost:5000/api/appointment/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setAppointments(response.data.data || []);
        }

        const profiles = {};
        const uniqueIds = new Set();

        response.data.data.forEach((appointment) => {
          if (role === "doctor") {
            const pid = refId(appointment.userId);
            if (pid) uniqueIds.add(pid);
          } else {
            const did = refId(appointment.doctorId);
            if (did) uniqueIds.add(did);
          }
        });

        for (const idStr of uniqueIds) {
          try {
            if (role === "doctor") {
              const patientResponse = await axios.get(
                `http://localhost:5000/api/user/profile/${idStr}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              profiles[idStr] = patientResponse.data.data;
            } else {
              const doctorResponse = await axios.get(
                `http://localhost:5000/api/doctors/${idStr}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              profiles[idStr] = doctorResponse.data.data;
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
            profiles[idStr] = null;
          }
        }
        setUserProfiles(profiles);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    if (activeFilter === "upcoming") {
      return new Date(appointment.dateTime) > new Date();
    }
    return true;
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="medical-page">
      {showSchedule ? (
        <ScheduleAppointment
          onBack={() => setShowSchedule(false)}
        />
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
                const otherId =
                  userRole === "doctor"
                    ? refId(appointment.userId)
                    : refId(appointment.doctorId);
                const userDetails = otherId
                  ? userProfiles[otherId]
                  : null;

                return (
                  <div
                    key={appointment._id}
                    className={`appointment-card ${appointment.status}`}
                  >
                    <div className="appointment-main">
                      <h3>{appointment.reason || "Medical Consultation"}</h3>

                      {userDetails && (
                        <>
                          {userRole === "doctor" ? (
                            <>
                              <p className="appointment-meta">
                                <span className="label">With:</span>{" "}
                                {`${userDetails.firstName} ${userDetails.lastName}`}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Email:</span>{" "}
                                {userDetails.email}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Phone:</span>{" "}
                                {userDetails.phone}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Address:</span>{" "}
                                {userDetails.address}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Gender:</span>{" "}
                                {userDetails.gender}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Blood Type:</span>{" "}
                                {userDetails.bloodType}
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
                                {`Dr. ${userDetails.firstName} ${userDetails.lastName}`}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Specialization:</span>{" "}
                                {userDetails.specialization}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Contact:</span>{" "}
                                {userDetails.phoneNumber}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Email:</span>{" "}
                                {userDetails.email}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Gender:</span>{" "}
                                {userDetails.gender}
                              </p>
                              <p className="appointment-meta">
                                <span className="label">Location:</span>{" "}
                                {userDetails.clinicAddress || "Clinic"}
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
                          )}
                        </>
                      )}
                      <p className="appointment-meta">
                        <span className="label">When:</span>{" "}
                        {new Date(appointment.dateTime).toLocaleDateString()}
                      </p>
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

export default AppointmentsPage;
