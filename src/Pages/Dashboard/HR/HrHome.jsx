import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FiUsers, FiCheckCircle, FiClock } from "react-icons/fi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Loader from "../../../Components/Loader/Loader";

const HRDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axiosSecure.get("/hr-dashboard-summary");
        setStats(res.data.stats);

        setRecentPayments(res.data.recentPayments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [axiosSecure]);
  console.log(stats);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-green-600">
        HR Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-2xl p-4 flex items-center space-x-4">
          <FiUsers className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-500">Total Employees</p>
            <p className="text-xl font-semibold">{stats.totalEmployees}</p>
          </div>
        </div>

        {/* <div className="bg-white shadow rounded-2xl p-4 flex items-center space-x-4">
          <FiCheckCircle className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-500">Paid This Month</p>
            <p className="text-xl font-semibold">{stats.paidThisMonth}</p>
          </div>
        </div> */}

        <div className="bg-white shadow rounded-2xl p-4 flex items-center space-x-4">
          <FiClock className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-gray-500">Pending Payments</p>
            <p className="text-xl font-semibold">{stats.pendingPayments}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 flex items-center space-x-4">
          <FaMoneyCheckAlt className="text-purple-500 text-3xl" />
          <div>
            <p className="text-gray-500">Total Payroll</p>
            <p className="text-xl font-semibold">${stats.totalPayroll}</p>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
        {recentPayments.length === 0 ? (
          <p className="text-gray-500">No recent payments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-4 text-left">Employee</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Month</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment._id} className="border-t">
                    <td className="py-2 px-4">{payment.employee_name}</td>
                    <td className="py-2 px-4">${payment?.salary}</td>
                    <td className="py-2 px-4">
                      {payment.month}/{payment.year}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {payment.paid ? (
                        <span className="text-green-600">Paid</span>
                      ) : (
                        <span className="text-red-600">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDashboardHome;
