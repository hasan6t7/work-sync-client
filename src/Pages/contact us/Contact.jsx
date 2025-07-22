import { useForm, ValidationError } from "@formspree/react";
import Swal from "sweetalert2";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [state, handleSubmit] = useForm("mvgqzovw");
  const addressRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.succeeded && !state.submitting) {
      Swal.fire({
        title: "Thanks for your feedback!",
        text: "Give me a bit of time, I’ll reach out soon.",
        icon: "success",
      });
      const form = document.getElementById("contactForm");
      if (form) {
        form.reset();
      }
    }
    if (state.errors && state.errors.length > 0) {
      Swal.fire({
        title: "Error",
        text: "Please check your inputs and try again.",
        icon: "error",
      });
    }
  }, [state]);

  useEffect(() => {
    // Ensure equal height on desktop
    if (addressRef.current && formRef.current) {
      const addressHeight = addressRef.current.offsetHeight;
      const formHeight = formRef.current.offsetHeight;
      const maxHeight = Math.max(addressHeight, formHeight);

      addressRef.current.style.height = `${maxHeight}px`;
      formRef.current.style.height = `${maxHeight}px`;
    }
  }, []);

  return (
    <div id="contact" className="my-20 px-4">
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-10 text-center text-green-500">
        Contact Us
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 max-w-5xl mx-auto">
        {/* Address Section */}
        <div
          ref={addressRef}
          className="w-full md:w-1/2 bg-green-50 rounded-xl p-6 shadow text-gray-800 flex flex-col justify-center"
        >
          <h2 className="text-xl font-semibold mb-4">Company Address</h2>
          <p>WorkSync Ltd.</p>
          <p>123 Dummy Street, Dream City</p>
          <p>Dhaka, Bangladesh</p>
          <p>Email: support@worksync.com</p>
          <p>Phone: +880 1234-567890</p>
        </div>

        {/* Contact Form */}
        <div
          ref={formRef}
          className="w-full md:w-1/2 flex flex-col justify-center"
        >
          <form
            id="contactForm"
            onSubmit={handleSubmit}
            className="space-y-6 bg-green-50 p-6 rounded-xl shadow h-full flex flex-col justify-between"
          >
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                />
              </div>
              <div className="w-full md:w-1/2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                required
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                rows="5"
              ></textarea>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full mt-4 font-bold bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
            >
              {state.submitting ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
