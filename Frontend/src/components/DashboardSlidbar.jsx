import React, { useEffect, useState } from "react";
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
import { jwtDecode } from "jwt-decode";

const DashboardSidebar = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null); // null until token is processed

  const [collapsed, setCollapsed] = useState(false);
  const mobileOpen = useSelector((state) => state.ui.mobileOpen);
  useEffect(() => {
    // localStorage.removeItem("token");
    // localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjEzMWU0ZDEyZGMwNzU1MDJhM2Y4ZCIsImVtYWlsIjoia2F2QGdtYWlsLmNvbSIsInJvbGUiOiJQYXRpZW50IiwiaWF0IjoxNzQ3MDA3OTk3LCJleHAiOjE3NDc2MTI3OTd9.T7qMdOqqWQTxAtVjhpoDNtlL6YDm2wP-Fz1qI9CopUU')
    const token = localStorage.getItem("token") || "";
    (async function () {
      if (token) {
        try {
          const decoded = await jwtDecode(token);
          console.log(decoded.role, decoded.id, decoded.email);
          setUser({ type: decoded.role, id: decoded.id, email: decoded.email });
        } catch (err) {
          console.error("Invalid token", err);
          setUser(null);
        }
      }
    })();
  }, []);

  const patientTabs = [
    { id: "home", label: "Home", path: "/dashboardPatient", icon: <FaHome /> },
    {
      id: "appointments",
      label: "Appointments",
      path: "/dashboardPatient/appointments",
      icon: <FaCalendarAlt />,
    },
    {
      id: "nearby-hospitals",
      label: "Nearby Hospitals",
      path: "/dashboardPatient/nearby-hospitals",
      icon: <FaHospital />,
    },

    {
      id: "profile",
      label: "Profile",
      path: "/dashboardPatient/profile",
      icon: <FaUser />,
    },
  ];

  const doctorTabs = [
    { id: "home", label: "Home", path: "/dashboardDoctor", icon: <FaHome /> },
    {
      id: "appointments",
      label: "Appointments",
      path: "/dashboardDoctor/appointments",
      icon: <FaCalendarAlt />,
    },

    {
      id: "profile",
      label: "Profile",
      path: "/dashboardDoctor/profile",
      icon: <FaUser />,
    },
  ];

  const tabs = user?.type === "Patient" ? patientTabs : doctorTabs;

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
