import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Loader from "../../../Components/Loader/Loader";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(
  "pk_test_51Rht9cCDgmr0cnmnRZohc1lpKeIeQGLVtjtPbjUole83XZaJv0JyO92BsHAv0ApRGzhLkAPyg7kZ7NVoYqGOPI0x00fH6wzeoD"
);

const CheckoutForm = ({ payroll, onPaid }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe not loaded");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: payroll.salary * 100,
      });
      const clientSecret = data.clientSecret;
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: payroll.employee_name,
              email: payroll.employee_email,
            },
          },
        }
      );
      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        await axiosSecure.patch(`/payroll/${payroll._id}/pay`, {
          transaction_id: paymentIntent.id,
          payment_date: new Date().toISOString(),
        });

        onPaid(payroll._id, paymentIntent.id);
        await Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `Successfully paid $${payroll.salary} to ${payroll.employee_name}.`,
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#32325d",
              "::placeholder": { color: "#a0aec0" },
            },
            invalid: { color: "#e53e3e" },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-success w-full"
      >
        {loading ? "Processing..." : `Pay $${payroll.salary}`}
      </button>
    </form>
  );
};

const PayrollPage = () => {
  const axiosSecure = useAxiosSecure();
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [isTableView, setIsTableView] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/payroll")
      .then((res) => {
        setPayrolls(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch payrolls");
        setLoading(false);
      });
  }, [axiosSecure]);

  const handlePayClick = (payroll) => {
    Swal.fire({
      title: `Pay ${payroll.employee_name}?`,
      text: `You will pay $${payroll.salary} for ${payroll.month} ${payroll.year}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedPayroll(payroll);
        document.getElementById("payment_modal").showModal();
      }
    });
  };

  const handlePaid = (id, transaction_id) => {
    setPayrolls((prev) =>
      prev.map((p) =>
        p._id === id
          ? {
              ...p,
              paid: true,
              status: "Paid",
              payment_date: new Date().toISOString(),
              transaction_id,
            }
          : p
      )
    );
    setSelectedPayroll(null);
    document.getElementById("payment_modal").close();
  };

  if (loading) return <Loader />;

  const sortedPayrolls = [...payrolls].sort((a, b) => {
    if (a.paid === b.paid) return 0;
    return a.paid ? 1 : -1; // unpaid first
  });

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Helmet>
        <title>Payroll</title>
      </Helmet>
      <div className="lg:flex lg:justify-between lg:items-center mb-4">
        <h2 className="text-2xl font-bold mb-2 lg:mb-0">Payroll Requests</h2>
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="btn bg-green-500 btn-sm"
        >
          Switch to {isTableView ? "Card Grid View" : "Table View"}
        </button>
      </div>

      {isTableView ? (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Employee Name</th>
                <th className="px-4 py-2 text-left">Salary</th>
                <th className="px-4 py-2 text-left">Month & Year</th>
                <th className="px-4 py-2 text-left">Payment Date</th>
                <th className="px-4 py-2 text-left">Transaction ID</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedPayrolls.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No payroll requests found.
                  </td>
                </tr>
              ) : (
                sortedPayrolls.map((p) => (
                  <tr key={p._id}>
                    <td className="px-4 py-2">{p.employee_name || "N/A"}</td>
                    <td className="px-4 py-2">${p.salary}</td>
                    <td className="px-4 py-2">
                      {p.month} {p.year}
                    </td>
                    <td className="px-4 py-2">
                      {p.paid
                        ? new Date(p.payment_date).toLocaleDateString()
                        : "Pending"}
                    </td>
                    <td className="px-4 py-2">
                      {p.transaction_id ? p.transaction_id.slice(-8) : "-"}
                    </td>
                    <td className="px-4 py-2">
                      {p.paid ? (
                        <span className="text-green-600 font-semibold">
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePayClick(p)}
                          className="btn btn-success btn-sm"
                        >
                          Pay
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedPayrolls.length === 0 ? (
            <p className="text-gray-500">No payroll requests found.</p>
          ) : (
            sortedPayrolls.map((p) => (
              <div
                key={p._id}
                className="border border-green-200 rounded-lg p-4 shadow hover:shadow-xl transition"
              >
                <h3 className="text-lg font-semibold">
                  {p.employee_name || "N/A"}
                </h3>
                <p className="text-sm text-gray-600">
                  {p.month} {p.year}
                </p>
                <p className="text-sm">
                  Salary: <span className="font-semibold">${p.salary}</span>
                </p>
                <p className="text-sm">
                  Status:{" "}
                  {p.paid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Pending</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  Payment Date:{" "}
                  {p.paid
                    ? new Date(p.payment_date).toLocaleDateString()
                    : "Not Paid"}
                </p>
                {p.transaction_id && (
                  <p className="text-xs text-gray-500">
                    Txn ID: {p.transaction_id.slice(-8)}
                  </p>
                )}
                {!p.paid && (
                  <button
                    onClick={() => handlePayClick(p)}
                    className="btn btn-success btn-sm mt-2 w-full"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <dialog id="payment_modal" className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4">
            Pay ${selectedPayroll?.salary} to {selectedPayroll?.employee_name}
          </h3>
          {selectedPayroll && (
            <Elements stripe={stripePromise}>
              <CheckoutForm payroll={selectedPayroll} onPaid={handlePaid} />
            </Elements>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-error"
                onClick={() => setSelectedPayroll(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PayrollPage;
