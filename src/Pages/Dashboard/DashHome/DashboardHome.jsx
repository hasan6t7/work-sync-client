import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import HRDashboardHome from "../HR/HrHome";
import AdminDashboardHome from "../Admin/AdminHome";
import EmployeeDashboardHome from "../Employee/EmpDashHome";

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
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "Employee") {
    return <EmployeeDashboardHome></EmployeeDashboardHome>;
  } else if (role === "HR") {
    return <HRDashboardHome></HRDashboardHome>;
  } else {
    return <p>Unathorized</p>;
  }
};

export default DashboardHome;
