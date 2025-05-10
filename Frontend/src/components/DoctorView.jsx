import React from "react";
import DoctorHome from "./DoctorHome";
import DoctorPatients from "./DoctorPatients";
import AppoinmentsPage from "./AppoinmentsPage";
import MessagesPage from "./MessagesPage";
import ProfilePage from "./ProfilePage";

const DoctorView = ({ activeTab }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <DoctorHome />;
      case "appointments":
        return <AppoinmentsPage isDoctorView={true} />;
      case "messages":
        return <MessagesPage isDoctorView={true} />;
      case "patients":
        return <DoctorPatients />;
      case "profile":
        return <ProfilePage isDoctorView={true} />;
      default:
        return <DoctorHome />;
    }
  };

  return <div className="doctor-view">{renderTabContent()}</div>;
};

export default DoctorView;
