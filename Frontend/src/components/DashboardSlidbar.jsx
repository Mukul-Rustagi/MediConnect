import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaEnvelope,
  FaPills,
  FaFlask,
  FaFileAlt,
  FaUser,
  FaMoneyBillAlt,
  FaUsers,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileOpen } from "../store/features/UI/uiSlice";

const DashboardSidebar = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const mobileOpen = useSelector((state) => state.ui.mobileOpen);

  // Tab configuSrations with icons (keep the same)
  const patientTabs = [
    { id: "home", label: "Home", path: "/dashboard", icon: <FaHome /> },
    {
      id: "appointments",
      label: "Appointments",
      path: "/dashboard/appointments",
      icon: <FaCalendarAlt />,
    },
    {
      id: "messages",
      label: "Messages",
      path: "/dashboard/messages",
      icon: <FaEnvelope />,
    },
    {
      id: "prescriptions",
      label: "Prescriptions",
      path: "/dashboard/prescriptions",
      icon: <FaPills />,
    },
    { id: "labs", label: "Labs", path: "/dashboard/labs", icon: <FaFlask /> },
    {
      id: "health-records",
      label: "Health Record",
      path: "/dashboard/health-records",
      icon: <FaFileAlt />,
    },
    {
      id: "profile",
      label: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser />,
    },
    {
      id: "billing",
      label: "Billing",
      path: "/dashboard/billing",
      icon: <FaMoneyBillAlt />,
    },
  ];

  const doctorTabs = [
    { id: "home", label: "Home", path: "/dashboard", icon: <FaHome /> },
    {
      id: "appointments",
      label: "Appointments",
      path: "/dashboard/appointments",
      icon: <FaCalendarAlt />,
    },
    {
      id: "messages",
      label: "Messages",
      path: "/dashboard/messages",
      icon: <FaEnvelope />,
    },
    {
      id: "profile",
      label: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser />,
    },
  ];

  const tabs = userType === "patient" ? patientTabs : doctorTabs;

  // Determine active tab based on path
  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path !== "/dashboard" && location.pathname.startsWith(path))
    );
  };

  const toggleCollapse = () => setCollapsed(!collapsed);
  const goBack = () => navigate(-1);
  console.log(mobileOpen);
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`dashboard-sidebar ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="sidebar-header">
          {!collapsed && <h2>Health Portal</h2>}
          <button
            className="collapse-toggle"
            onClick={() => dispatch(toggleMobileOpen())}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <nav>
          <ul>
            {/* Back Button */}
            <li>
              <button className="sidebar-tab back-button" onClick={goBack}>
                <span className="tab-icon">
                  <FaArrowLeft />
                </span>
                {!collapsed && <span className="tab-label">Go Back</span>}
              </button>
            </li>

            {/* Navigation Tabs with Link */}
            {tabs.map((tab) => (
              <li key={tab.id}>
                <Link
                  to={tab.path}
                  className={`sidebar-tab ${
                    isActive(tab.path) ? "active" : ""
                  }`}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  {!collapsed && <span className="tab-label">{tab.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;
