import React from "react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Boosting HR Efficiency for TechNova Ltd",
      challenge:
        "Manual workflow tracking caused delays and approval bottlenecks.",
      solution:
        "Implemented WorkSync for real-time task tracking and automated salary management.",
      result: "Reduced workflow approval time by 40% within 2 months.",
    },
    {
      title: "Scaling Operations for BrightEdge",
      challenge: "Difficulty managing remote employees efficiently.",
      solution:
        "Provided centralized updates and transparent workflow monitoring using WorkSync.",
      result:
        "Improved employee productivity by 30% and reduced miscommunication.",
    },
  ];
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2
        data-aos="fade-right"
        className="text-3xl md:text-4xl font-bold text-center text-green-600 mb-20"
      >
        Case Studies & Success Stories
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {caseStudies.map((study, index) => (
          <div
            data-aos="zoom-in-up"
            key={index}
            className="bg-white border border-green-200 rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              {study.title}
            </h3>
            <p className="mb-2">
              <span className="font-semibold text-green-600">Challenge:</span>{" "}
              {study.challenge}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-green-600">Solution:</span>{" "}
              {study.solution}
            </p>
            <p>
              <span className="font-semibold text-green-600">Result:</span>{" "}
              {study.result}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
