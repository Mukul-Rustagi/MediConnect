import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DietRecommendation from "./DietRecommendation";

const QuickActionCard = ({ action }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  // Determine the target route or action based on the card title
  const handleNavigate = () => {
    switch (action.title) {
      case "Start Consultation":
        navigate("/dashboard/appointments");
        break;
      case "View Schedule":
        navigate("/dashboard/appointments");
        break;
      case "View Diet Plan using AI":
        setModalOpen(true);
        break;
      default:
        console.warn(`No route configured for action title: ${action.title}`);
    }
  };

  // Close the modal
  const handleClose = () => setModalOpen(false);

  return (
    <>
      {modalOpen && <DietRecommendation onClose={handleClose} />}

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