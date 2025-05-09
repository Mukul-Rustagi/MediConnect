import React from "react";

const DashboardHeader = ({ userType, toggleUserType }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>MediConnect</h1>
      </div>
      <div className="header-right">
        <button onClick={toggleUserType} className="user-type-toggle">
          Switch to {userType === "patient" ? "Doctor" : "Patient"} View
        </button>
        <div className="user-profile">
          <span className="user-name">
            {userType === "patient" ? "John Doe" : "Dr. Samantha Freeman"}
          </span>
          <div className="user-avatar">
            {userType === "patient" ? "JD" : "SF"}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
