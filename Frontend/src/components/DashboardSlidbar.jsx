import React from "react";

const DashboardSidebar = ({
  activeTab,
  setActiveTab,
  userType,
  collapsed,
  toggleCollapse,
}) => {
  const patientTabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "appointments", label: "Appointments", icon: "📅" },
    { id: "messages", label: "Messages", icon: "✉️" },
    { id: "prescriptions", label: "Prescriptions", icon: "💊" },
    { id: "labs", label: "Labs", icon: "🧪" },
    { id: "health-records", label: "Health Record", icon: "📋" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "billing", label: "Billing", icon: "💰" },
  ];

  const doctorTabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "appointments", label: "Appointments", icon: "📅" },
    { id: "messages", label: "Messages", icon: "✉️" },
    { id: "patients", label: "Patients", icon: "👥" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  const tabs = userType === "patient" ? patientTabs : doctorTabs;

  return (
    <aside className={`dashboard-sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="collapse-toggle" onClick={toggleCollapse}>
        {collapsed ? "→" : "←"}
      </button>
      <nav>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`sidebar-tab ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                {!collapsed && <span className="tab-label">{tab.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
