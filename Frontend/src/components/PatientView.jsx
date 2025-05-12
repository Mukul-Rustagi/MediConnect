import React from "react";
import PatientHome from "./PatientHome";
import MessagesPage from "./MessagesPage";
import PatientPrescriptions from "./PatientPrescription";
import PatientHealthRecords from "./PatientHealthRecords";
import PatientBilling from "./PatientBilling";
import PatientsLabs from "./PatientsLabs";
import PatientAppoinments from "./AppoinmentsPage";
import ProfilePage from "./ProfilePage";

const PatientView = ({ activeTab }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <PatientHome />;

      case "appointments":
        return <PatientAppoinments isDoctorView={false} />;
      case "messages":
        return <MessagesPage isDoctorView={false} />;
      case "prescriptions":
        return <PatientPrescriptions />;
      case "labs":
        return <PatientsLabs />;
      case "health-records":
        return <PatientHealthRecords />;
      case "profile":
        return <ProfilePage isDoctorView={false} />;
      case "billing":
        return <PatientBilling />;
      default:
        return <PatientHome />;
    }
  };

  return <div className="patient-view">{renderTabContent()}</div>;
};

export default PatientView;
