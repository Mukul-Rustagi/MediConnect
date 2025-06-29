import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DietRecommendation from "./DietRecommendation";
import NearByHospitals from "./Near_By_Hospitals";
import MapComponent from "./Near_By_Hospitals2";

const QuickActionCard = ({ action }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [hospitalsModalOpen, setHospitalsModalOpen] = useState(false);

  // Determine the target route or action based on the card title
  const handleNavigate = () => {
    switch (action.title) {
      case "Request Appointment":
        navigate("/dashboardPatient/appointments");
        break;
      case "View Schedule":
        navigate("/dashboardPatient/appointments");
        break;
      case "Show Near by hospital":
        setHospitalsModalOpen(true);
        break;
      case "Make a Diet Plan by AI":
        setModalOpen(true);
        break;
      default:
        console.warn(`No route configured for action title: ${action.title}`);
    }
  };

  // Close the modals
  const handleClose = () => setModalOpen(false);
  const handleHospitalsClose = () => setHospitalsModalOpen(false);

  return (
    <>
      {modalOpen && <DietRecommendation onClose={handleClose} />}
      {hospitalsModalOpen && <NearByHospitals onClose={handleHospitalsClose} />}

      <div
        className="quick-action-card"
        style={{ borderTopColor: action.color }}
      >
        <div
          className="action-icon"
          style={{ backgroundColor: `${action.color}20` }}
        >
          {action.icon}
        </div>
        <h3>{action.title}</h3>
        <p className="action-description">{action.description}</p>
        <button
          className="action-button"
          style={{ backgroundColor: action.color }}
          onClick={handleNavigate}
        >
          {action.actionText}
        </button>
      </div>
    </>
  );
};

export default QuickActionCard;
