import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div>
      <header>
        <nav>
          <Navbar></Navbar>
        </nav>
      </header>
      <main>
        <section>
          <Outlet></Outlet>
        </section>
      </main>
    </div>
  );
};

export default Root;
