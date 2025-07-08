import React from "react";
import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import logo from "/logo.png";

const DashLayout = () => {
  const { user } = useAuth();
  console.log(user)

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
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
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden font-semibold">
            Dashboard
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-1">
          {/* Sidebar Menu Items */}
          <div className="space-y-3 flex gap-1">
            <img src={logo} alt="WorkSync Logo" className="h-12" />
            <h4 className="  text-lg md:text-3xl py-1 font-bold  bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              <span className="">Work</span>Sync
            </h4>
          </div>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "bg-green-200 font-semibold" : ""
              }
            >
              🏠 Dashboard Home
            </NavLink>
          </li>

          {/* Role-based navigation */}
          {user?.role === "Employee" && (
            <>
              
            </>
          )}

          {user?.role === "HR" && (
            <>
              
            </>
          )}

          {user?.role === "Admin" && (
            <>
             
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashLayout;
