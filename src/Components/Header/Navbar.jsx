import { Link, NavLink } from "react-router";
import logo from "/logo.png"

const Navbar = () => {


    return (
        <div className="pt-3 sticky top-0 z-50 ">
            <div className="navbar mx-auto max-w-full px-5 bg-green-50 rounded-2xl">
                <div className="md:navbar-start flex items-center gap-2">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
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
                            <li>
                                Home
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <img className="w-[40px] md:w-[60px]" src={logo} alt="logo" />
                        <h4  className="  text-lg md:text-3xl py-1 font-bold  bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                            <span className="">Work</span>Sync
                        </h4>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal text-lg px-1 ">
                        <li>
                            Home
                        </li>
                    </ul>
                </div>
                <div className="md:navbar-end hidden md:flex">

                    <button className="btn  bg-transparent  flex items-center md:gap-3 gap-1 border-2 px-1 md:px-3 rounded-md">
                        Contact
                        Me
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
