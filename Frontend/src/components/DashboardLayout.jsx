// DashboardLayout.js
import { Outlet } from "react-router";
import DashboardSidebar from "./DashboardSlidbar";
import { FaBell, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMobileOpen } from "../store/features/UI/uiSlice";

const DashboardLayout = ({ user, summaryData }) => {
  const dispatch = useDispatch();

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
              <span className="user-name">{name}</span>
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
