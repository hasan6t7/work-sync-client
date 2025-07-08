import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div>
        <ToastContainer />
      <header>
        <nav>
          <Navbar></Navbar>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto bg-gradient-to-br from-green-50 to-green-100">
        <section>
          <Outlet></Outlet>
        </section>
      </main>
    </div>
  );
};

export default Root;
