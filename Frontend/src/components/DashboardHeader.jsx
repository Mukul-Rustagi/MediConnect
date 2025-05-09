// import React from "react";

// const DashboardHeader = ({ userType, toggleUserType }) => {
//   return (
//     <header className="dashboard-header">
//       <div className="header-left">
//         <h1>MediConnect</h1>
//       </div>
//       <div className="header-right">
//         <button onClick={toggleUserType} className="user-type-toggle">
//           Switch to {userType === "patient" ? "Doctor" : "Patient"} View
//         </button>
//         <div className="user-profile">
//           <span className="user-name">
//             {userType === "patient" ? "John Doe" : "Dr. Samantha Freeman"}
//           </span>
//           <div className="user-avatar">
//             {userType === "patient" ? "JD" : "SF"}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;
import React from "react";

const DashboardHeader = ({ userType, toggleUserType }) => {
  // Determine the next user type for button label
  const getNextUserType = () => {
    if (userType === "patient") return "Doctor";
    if (userType === "doctor") return "Admin";
    return "Patient";
  };

  // Define user info for display
  const userInfo = {
    patient: { name: "John Doe", initials: "JD" },
    doctor: { name: "Dr. Samantha Freeman", initials: "SF" },
    admin: { name: "Admin User", initials: "AU" },
  };

  const { name, initials } = userInfo[userType];

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>MediConnect</h1>
      </div>
      <div className="header-right">
        <button onClick={toggleUserType} className="user-type-toggle">
          Switch to {getNextUserType()} View
        </button>
        <div className="user-profile">
          <span className="user-name">{name}</span>
          <div className="user-avatar">{initials}</div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
