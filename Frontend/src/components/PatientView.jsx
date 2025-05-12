import React from "react";
import PatientHome from "./PatientHome";
import MessagesPage from "./MessagesPage";
import PatientPrescriptions from "./PatientPrescription";
import PatientHealthRecords from "./PatientHealthRecords";
import PatientBilling from "./PatientBilling";
import PatientsLabs from "./PatientsLabs";
import PatientAppoinments from "./AppoinmentsPage";
import ProfilePage from "./ProfilePage";
import NearByHospitals from "./Near_By_Hospitals";

const PatientView = ({ activeTab }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <PatientHome />;

      case "appointments":
        return <PatientAppoinments isDoctorView={false} />;
      case "nearby-hospitals":
        return <NearByHospitals />;
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
