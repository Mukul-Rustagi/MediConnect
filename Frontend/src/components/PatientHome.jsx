import React from "react";
import QuickActionCard from "./QuickActionCard";
import AppointmentCard from "./Appointment";
import MessageCard from "./MessageCard";

const PatientHome = () => {
  const upcomingAppointments = [
    {
      id: 1,
      title: "Primary Care Follow-up",
      doctor: "Dr. Samantha Freeman",
      date: "Dec 20, 2023",
      time: "10:00 AM",
      location: "Main Clinic",
    },
    {
      id: 2,
      title: "Dermatology Consultation",
      doctor: "Dr. Michael Chen",
      date: "Dec 22, 2023",
      time: "2:30 PM",
      location: "Specialty Center",
    },
  ];

  const recentMessages = [
    {
      id: 1,
      sender: "Dr. Samantha Freeman",
      preview:
        "Your test results are ready. Please review them at your earliest convenience.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Billing Department",
      preview: "Your recent payment has been processed. Thank you!",
      time: "3 days ago",
      unread: false,
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: "Request a new appointment",
      description:
        "Want to book an appointment with a specific provider? You can do that here",
      icon: "📅",
      actionText: "Request an appointment →",
    },
    {
      id: 2,
      title: "Upload health documents",
      description:
        "Share your medical records or test results with your care team",
      icon: "📄",
      actionText: "Upload now →",
    },
  ];

  return (
    <div className="patient-home">
      <section className="dashboard-section">
        <h2>Your next appointment is in 3 days</h2>
        <div className="appointments-grid">
          {upcomingAppointments.map((appt) => (
            <AppointmentCard key={appt.id} appointment={appt} />
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

      <section className="dashboard-section quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <QuickActionCard key={action.id} action={action} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PatientHome;
