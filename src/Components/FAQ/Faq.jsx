import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const faqs = [
  {
    question: "What is WorkSync, and how does it help me?",
    answer:
      "WorkSync helps you manage employee workflow, track salaries, and monitor contracts from a single dashboard, streamlining your HR operations.",
  },
  {
    question: "Is WorkSync secure?",
    answer:
      "Yes, we use secure authentication and encrypted database storage to protect your data.",
  },
  {
    question: "Can I use WorkSync on mobile devices?",
    answer:
      "Absolutely. WorkSync is fully responsive and accessible from any device.",
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, our support team is available 24/7 via chat and email.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <section className=" px-6 lg:px-20 py-12">
      <h2
        data-aos="fade-left"
        className="text-3xl md:text-4xl font-bold text-center text-green-600 mb-20"
      >
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            data-aos="zoom-in-up"
            key={index}
            className="border border-green-300 rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-4 py-4 text-left text-green-800 font-medium hover:bg-green-50 transition"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeIndex === index && (
              <div className="px-4 pb-4 ">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
