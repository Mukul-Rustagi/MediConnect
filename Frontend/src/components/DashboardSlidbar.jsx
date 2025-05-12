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
  FaArrowLeft,
  FaHospital,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileOpen } from "../store/features/UI/uiSlice";

const DashboardSidebar = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const mobileOpen = useSelector((state) => state.ui.mobileOpen);

  const patientTabs = [
    { id: "home", label: "Home", path: "/dashboard", icon: <FaHome /> },
    {
      id: "appointments",
      label: "Appointments",
      path: "/dashboard/appointments",
      icon: <FaCalendarAlt />,
    },
    {
      id: "nearby-hospitals",
      label: "Nearby Hospitals",
      path: "/dashboard/nearby-hospitals",
      icon: <FaHospital />,
    },
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
      id: "profile",
      label: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser />,
    },
  ];

  const tabs = userType === "patient" ? patientTabs : doctorTabs;

  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path !== "/dashboard" && location.pathname.startsWith(path))
    );
  };

  const goBack = () => navigate(-1);
  return (
    <>
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
