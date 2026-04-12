// DashboardLayout.js
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "./DashboardSlidbar";
import { FaBell, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMobileOpen } from "../store/features/UI/uiSlice";
import { jwtDecode } from "jwt-decode";

const DashboardLayout = ({ user, summaryData }) => {
  const dispatch = useDispatch();
  const [greetingName, setGreetingName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const d = jwtDecode(token);
      const fromEmail =
        typeof d.email === "string" ? d.email.split("@")[0] : "";
      setGreetingName(fromEmail || "there");
    } catch {
      setGreetingName("there");
    }
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardSidebar userType={user?.type} />
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div className="header-left">
            <button
              className="collapse-toggle"
              onClick={() => dispatch(toggleMobileOpen())}
            >
              ☰
            </button>
            <h1>Welcome back, {summaryData?.name}</h1>
          </div>
          <div className="header-actions">
            <button className="notification-btn">
              <FaBell />
              {summaryData?.unreadMessages > 0 && (
                <span className="notification-badge">
                  {summaryData?.unreadMessages}
                </span>
              )}
            </button>
            <div className="user-profile">
              <span className="user-name">{greetingName}</span>
              <div className="user-avatar">
                <FaUser />
              </div>
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};
export default DashboardLayout;
