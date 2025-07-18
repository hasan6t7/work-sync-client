import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import logo from "/logo.png";
import useUserRole from "../hooks/useUserRole";
import { AiFillHome } from "react-icons/ai";
import { BsFileEarmarkText } from "react-icons/bs";
import { FaMoneyCheckAlt, FaUsers } from "react-icons/fa";
import { TbProgress } from "react-icons/tb";

const DashLayout = () => {
  const navigate = useNavigate();
  const { role, roleLoading } = useUserRole();

  if (roleLoading || !role) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  
  console.log("Role from DB:", role);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-semibold">Dashboard</div>
        </div>

        {/* Routed Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-1">
          {/* Logo */}
          <div
            onClick={()=> navigate("/")}
            className="flex items-center gap-2 mb-4 cursor-pointer"
          >
            <img src={logo} alt="WorkSync Logo" className="h-10" />
            <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              WorkSync
            </h4>
          </div>

          {/* Universal Dashboard Home */}
          <li className="font-bold">
            <NavLink to="/dashboard">
              <AiFillHome size={20} /> Dashboard Home
            </NavLink>
          </li>

          {/* Role-based Sidebar */}
          {role === "Employee" && (
            <>
              <li className="font-bold">
                <NavLink to="/dashboard/work-sheet">
                  <BsFileEarmarkText size={20} /> Work Sheet
                </NavLink>
              </li>
              <li className="font-bold">
                <NavLink to="/dashboard/payment-history">
                  <FaMoneyCheckAlt size={20} /> Payment History
                </NavLink>
              </li>
            </>
          )}

          {role === "HR" && (
            <>
              <li className="font-bold">
                <NavLink to="/dashboard/employee-list"><FaUsers size={20} /> Employee List</NavLink>
              </li>
              <li className="font-bold">
                <NavLink to="/dashboard/progress"><TbProgress size={20} /> Progress</NavLink>
              </li>
            </>
          )}

          {role === "Admin" && (
            <>
              <li>
                <NavLink to="/dashboard/all-employee-list">
                  All Employee List
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashLayout;
