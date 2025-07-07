import { Link, NavLink } from "react-router";
import logo from "/logo.png"
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user } = useAuth();
    const navlink = <>
        <li>
            <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
            <NavLink to={"/login"}>Login</NavLink>
        </li>
        <li>
            <NavLink to={"/register"}>Register</NavLink>
        </li>
    </>

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
                            {navlink}
                        </ul>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <img className="w-[40px] md:w-[60px]" src={logo} alt="logo" />
                        <h4 className="  text-lg md:text-3xl py-1 font-bold  bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                            <span className="">Work</span>Sync
                        </h4>
                    </div>
                </div>
                <div className={user ? "navbar-center hidden lg:flex" : "navbar-end hidden lg:flex"}>
                    <ul className="menu menu-horizontal text-lg px-1 ">
                        {navlink}
                    </ul>
                </div>
                <div className={user ? "md:navbar-end hidden md:flex" : "hidden "}>

                    <div className="avatar">
                        <div className="h-[45px] w-[45px] ring-green-700 ring-offset-base-100 rounded-full ring-2 ring-offset-2">
                            <img src={user?.photoURL} referrerPolicy="no-referrer" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
