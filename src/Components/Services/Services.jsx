import { CheckCircle } from "lucide-react";
import React from "react";

const Services = () => {
  return (
    <section className="py-16 px-6 md:px-16 ">
      <h2 className="text-4xl font-extrabold text-green-600 text-center mb-16">
        Services We Provide
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
        {[
          {
            icon: <CheckCircle className="w-10 h-10 text-green-600" />,
            title: "Workflow Tracking",
            desc: "Efficiently monitor and manage employee workflow in real-time for better productivity.",
          },
          {
            icon: <CheckCircle className="w-10 h-10 text-green-600" />,
            title: "Salary Management",
            desc: "Streamline salary calculations, disbursements, and payroll processing with ease.",
          },
          {
            icon: <CheckCircle className="w-10 h-10 text-green-600" />,
            title: "Contract Monitoring",
            desc: "Keep track of employee contracts, renewals, and important deadlines effortlessly.",
          },
        ].map(({ icon, title, desc }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 border-t-4 border-b-4 border-green-500 cursor-pointer"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              {title}
            </h3>
            <p className="text-gray-700">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
