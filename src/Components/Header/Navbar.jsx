import { Link, NavLink, useNavigate } from "react-router";
import logo from "/logo.png";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const { user, loading, LogOutUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  if (loading) {
    return <Loader></Loader>;
  }
  const navlink = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-green-500 border-b border-green-500" : ""
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-green-500 border-b border-green-500" : ""
              }
              to={"/dashboard"}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-green-500 border-b border-green-500" : ""
              }
              to={"/contact"}
            >
              Contact Us
            </NavLink>
          </li>
        </>
      ) : (
        <>
          {" "}
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-green-500 border-b border-green-500" : ""
              }
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-green-500 border-b border-green-500" : ""
              }
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        LogOutUser()
          .then(() => {
            setIsModalOpen(false);
            navigate("/");
            Swal.fire({
              title: "Logged Out",
              text: "You have been logged out successfully.",
              icon: "success",
            });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
  };

  return (
    <div className="pt-3 sticky top-0 z-50 max-w-full mx-auto lg:px-5 bg-green-50 border-b border-green-200">
      <div className="navbar max-w-7xl mx-auto  rounded-2xl">
        <div className="md:navbar-start flex  items-center gap-2">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn px-0 btn-ghost lg:hidden"
              //   onClick={scrollToTop}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm  dropdown-content mt-3 z-[1] p-4 shadow rounded-box w-52"
            >
              {navlink}
            </ul>
          </div>
          <Link to={"/"}>
            <div className="flex items-center gap-1 cursor-pointer">
              <img className="w-[40px] md:w-[60px]" src={logo} alt="logo" />
              <h4 className="  text-lg md:text-3xl py-1 font-bold  bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                <span className="">Work</span>Sync
              </h4>
            </div>
          </Link>
        </div>
        <div
          className={
            user ? "navbar-center hidden lg:flex" : "navbar-end hidden lg:flex"
          }
        >
          <ul className="menu menu-horizontal text-lg px-1 ">{navlink}</ul>
        </div>
        <div className={user ? "navbar-end  " : "hidden "}>
          <div
            onClick={() => setIsModalOpen(true)}
            className="avatar cursor-pointer"
            title={user?.displayName || "User"}
          >
            <div className="h-[45px] w-[45px] ring-green-700 ring-offset-base-100 rounded-full ring-2 ring-offset-2 overflow-hidden">
              <img
                src={user?.photoURL}
                alt="User"
                referrerPolicy="no-referrer"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          {isModalOpen && (
            <dialog open className="modal modal-bottom sm:modal-middle">
              <div className="modal-box text-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </button>
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-24 h-24 rounded-full ring-2 ring-green-600 object-cover"
                  />
                  <h3 className="font-bold text-xl">{user?.displayName}</h3>
                  <p className="text-lg text-gray-500">{user?.email}</p>
                  <button
                    onClick={handleLogOut}
                    className="btn bg-green-600  text-white hover:bg-green-700 mt-4"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
