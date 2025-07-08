import React, { useEffect } from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import AOS from "aos";
import Footer from "../Components/Footer/Footer";

const Root = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);
  return (
    <div>
      <ToastContainer />
      <header>
        <nav>
          <Navbar></Navbar>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto ">
        <section>
          <Outlet></Outlet>
        </section>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
