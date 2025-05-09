import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSlidbar";
import "../styles/Dashboard.css";
import DoctorView from "./DoctorView";
import PatientView from "./PatientView";
import AdminView from "./AdminView"; // ⬅️ Make sure this component exists

const USER_TYPES = ["patient", "doctor", "admin"];

const Dashboard = () => {
  const [userTypeIndex, setUserTypeIndex] = useState(0); // 0: patient, 1: doctor, 2: admin
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const userType = USER_TYPES[userTypeIndex];

  const toggleUserType = () => {
    setUserTypeIndex((prevIndex) => (prevIndex + 1) % USER_TYPES.length);
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
        <DashboardHeader userType={userType} toggleUserType={toggleUserType} />

        <div className="dashboard-content">
          {userType === "patient" ? (
            <PatientView activeTab={activeTab} />
          ) : userType=='doctor'?(
            <DoctorView activeTab={activeTab} />
          ):<AdminView activeTab={activeTab} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
