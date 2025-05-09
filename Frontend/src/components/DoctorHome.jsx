import React from "react";
import AppointmentCard from "./Appointment";
import MessageCard from "./MessageCard";
import PatientCard from "./PatientCard";

const DoctorHome = () => {
  const todaysAppointments = [
    {
      id: 1,
      title: "Annual Physical",
      patient: "John Doe",
      date: "Today",
      time: "10:00 AM",
      location: "Exam Room 3",
    },
    {
      id: 2,
      title: "Follow-up Visit",
      patient: "Sarah Johnson",
      date: "Today",
      time: "11:30 AM",
      location: "Exam Room 2",
    },
  ];

  const recentMessages = [
    {
      id: 1,
      sender: "John Doe",
      preview: "I have a question about my recent lab results...",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      preview: "Thank you for the prescription!",
      time: "Yesterday",
      unread: false,
    },
  ];

  const recentPatients = [
    {
      id: 1,
      name: "John Doe",
      lastVisit: "Dec 15, 2023",
      nextAppointment: "Jan 10, 2024",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      lastVisit: "Dec 10, 2023",
      nextAppointment: "Jan 5, 2024",
      avatar: "SJ",
    },
  ];

  return (
    <div className="doctor-home">
      <section className="dashboard-section">
        <h2>Today's Appointments</h2>
        <div className="appointments-grid">
          {todaysAppointments.map((appt) => (
            <AppointmentCard key={appt.id} appointment={appt} isDoctorView />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Messages</h2>
        <div className="messages-grid">
          {recentMessages.map((msg) => (
            <MessageCard key={msg.id} message={msg} />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Recent Patients</h2>
        <div className="patients-grid">
          {recentPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DoctorHome;
