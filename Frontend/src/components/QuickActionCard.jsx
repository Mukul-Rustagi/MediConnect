import React from "react";

const QuickActionCard = ({ action }) => {
  return (
    <div className="card quick-action-card">
      <div className="action-icon">{action.icon}</div>
      <h3>{action.title}</h3>
      <p>{action.description}</p>
      <button className="btn btn-link">{action.actionText}</button>
    </div>
  );
};

export default QuickActionCard;
