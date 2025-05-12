import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSlidbar";
import "../styles/Dashboard.css";
import DoctorView from "./DoctorView";
import PatientView from "./PatientView";

const Dashboard = () => {
  const [userType, setUserType] = useState("patient"); // 'patient' or 'doctor'
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleUserType = () => {
    setUserType((prev) => (prev === "patient" ? "doctor" : "patient"));
  };

  return (
    <div className={`dashboard ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userType={userType}
        collapsed={sidebarCollapsed}
        toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="dashboard-main">
        {/* <DashboardHeader userType={userType} toggleUserType={toggleUserType} /> */}

        <div className="dashboard-content">
          {userType === "patient" ? (
            <PatientView activeTab={activeTab} />
          ) : (
            <DoctorView activeTab={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
