import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import {
  FaFileAlt,
  FaMoneyCheckAlt,
  FaDollarSign,
  FaCalendarCheck,
} from "react-icons/fa";
import Loader from "../../../Components/Loader/Loader";

const EmployeeDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/employee-dashboard-summary?email=${user.email}`)
      .then((res) => {
        setSummary(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load dashboard data.");
        setLoading(false);
      });
  }, [axiosSecure, user]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Helmet>
        <title>Employee Dashboard | WorkSync</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6">
        Welcome back, {user.displayName || user.email}!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Worksheets Submitted */}
        <div className="bg-blue-100 p-4 rounded shadow flex items-center gap-4">
          <FaFileAlt className="text-blue-600 text-3xl" />
          <div>
            <p className="text-gray-600">Worksheets Submitted</p>
            <p className="text-xl font-bold">{summary.totalWorksheets}</p>
          </div>
        </div>

        {/* Payments Received */}
        <div className="bg-green-100 p-4 rounded shadow flex items-center gap-4">
          <FaMoneyCheckAlt className="text-green-600 text-3xl" />
          <div>
            <p className="text-gray-600">Payments Received</p>
            <p className="text-xl font-bold">{summary.totalPayments}</p>
          </div>
        </div>

        {/* Total Earned */}
        <div className="bg-purple-100 p-4 rounded shadow flex items-center gap-4">
          <FaDollarSign className="text-purple-600 text-3xl" />
          <div>
            <p className="text-gray-600">Total Earned</p>
            <p className="text-xl font-bold">${summary.totalAmount}</p>
          </div>
        </div>

        {/* Current Month Payment */}
        <div className="bg-yellow-100 p-4 rounded shadow flex items-center gap-4">
          <FaCalendarCheck className="text-yellow-600 text-3xl" />
          <div>
            <p className="text-gray-600">This Month's Payment</p>
            <p
              className={`text-xl font-bold ${
                summary.currentMonthPaid ? "text-green-700" : "text-red-600"
              }`}
            >
              {summary.currentMonthPaid ? "Paid" : "Pending"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardHome;
