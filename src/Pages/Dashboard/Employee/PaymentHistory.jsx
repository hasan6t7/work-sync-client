import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [view, setView] = useState("table"); // "table" or "grid"
  const limit = 5;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/payment-history", {
          params: { email: user.email, page, limit },
        });
        setPayments(res.data.payments);
        setTotal(res.data.total);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load payment history.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchPayments();
    }
  }, [user?.email, page, axiosSecure]);

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Payment History</h2>
        <button
          onClick={() => setView(view === "table" ? "grid" : "table")}
          className="btn btn-sm"
          aria-label="Toggle View"
        >
          {view === "table" ? "Card View" : "Table View"}
        </button>
      </div>

      {view === "table" ? (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-left">Year</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No payment history found.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p._id}>
                    <td className="px-4 py-2">{p.month}</td>
                    <td className="px-4 py-2">{p.year}</td>
                    <td className="px-4 py-2">${p.salary}</td>
                    <td className="px-4 py-2 break-all">{p.transaction_id}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {payments.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No payment history found.
            </p>
          ) : (
            payments.map((p) => (
              <div
                key={p._id}
                className="border border-green-300 rounded p-4 shadow hover:shadow-xl transition"
              >
                <p>
                  <strong>Month:</strong> {p.month}
                </p>
                <p>
                  <strong>Year:</strong> {p.year}
                </p>
                <p>
                  <strong>Amount:</strong> ${p.salary}
                </p>
                <p className="break-all">
                  <strong>Transaction ID:</strong> {p.transaction_id}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="btn btn-sm"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="btn btn-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
