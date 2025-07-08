import React, { useEffect } from "react";

import { Laptop, ArrowRight } from "lucide-react";
import "aos/dist/aos.css";
import AOS from "aos";

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-12   min-h-[70vh]">
      <div
        data-aos="fade-right"
        className="w-full md:w-1/2 text-center md:text-left space-y-4"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-green-600">
          Streamline Employee Management Effortlessly.
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-md mx-auto md:mx-0">
          Track workflow, manage salaries, and monitor contracts in one place.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-base">
            Get Started
          </button>
          <button className="border border-green-500 text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl text-base flex items-center gap-2">
            Book a Demo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div
        data-aos="fade-left"
        className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center"
      >
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
          alt="Team collaboration"
          className="rounded-xl shadow-md w-full max-w-md"
        />
      </div>
    </section>
  );
};

export default Banner;
