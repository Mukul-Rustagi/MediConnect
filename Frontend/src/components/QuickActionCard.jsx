import React from "react";

const QuickActionCard = ({ action }) => {
  return (
    <div className="quick-action-card" style={{ borderTopColor: action.color }}>
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
      >
        {action.actionText}
      </button>
    </div>
  );
};

export default QuickActionCard;
