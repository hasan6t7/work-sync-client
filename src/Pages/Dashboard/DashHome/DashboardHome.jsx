import React from "react";
import useUserRole from "../../../hooks/useUserRole";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading || !role) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (role === "Admin") {
    return <p>Admin</p>;
  } else if (role === "Employee") {
    return <p>Employee</p>;
  } else if (role === "HR") {
    return <p>HR</p>;
  } else {
    return <p>Unathorized</p>;
  }
};

export default DashboardHome;
