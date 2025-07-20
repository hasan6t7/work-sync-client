import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import {
  FaUsers,
  FaUserTie,
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import Loader from "../../../Components/Loader/Loader";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/admin-dashboard-summary")
      .then((res) => {
        setSummary(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load dashboard summary.");
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Helmet>
        <title>Admin Dashboard | WorkSync</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-green-600">
        Admin Dashboard{" "}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Employees */}
        <div className="bg-green-100 p-4 rounded shadow flex items-center gap-4">
          <FaUsers className="text-green-600 text-3xl" />
          <div>
            <p className="text-gray-600">Total Employees</p>
            <p className="text-xl font-bold">{summary.totalEmployees}</p>
          </div>
        </div>

        {/* Total HR */}
        <div className="bg-blue-100 p-4 rounded shadow flex items-center gap-4">
          <FaUserTie className="text-blue-600 text-3xl" />
          <div>
            <p className="text-gray-600">Total HR</p>
            <p className="text-xl font-bold">{summary.totalHR}</p>
          </div>
        </div>

        {/* Pending Payroll Requests */}
        <div className="bg-yellow-100 p-4 rounded shadow flex items-center gap-4">
          <FaFileInvoiceDollar className="text-yellow-600 text-3xl" />
          <div>
            <p className="text-gray-600">Pending Payrolls</p>
            <p className="text-xl font-bold">{summary.pendingPayroll}</p>
          </div>
        </div>

        {/* Paid this month */}
        <div className="bg-purple-100 p-4 rounded shadow flex items-center gap-4">
          <FaMoneyCheckAlt className="text-purple-600 text-3xl" />
          <div>
            <p className="text-gray-600">Paid This Month</p>
            <p className="text-xl font-bold">{summary.totalPaidThisMonth}</p>
          </div>
        </div>
      </div>

      {/* Future: You can add charts here if desired */}
      {/* <div className="mt-8">
        <ChartComponent data={summary.chartData} />
      </div> */}
    </div>
  );
};

export default AdminDashboardHome;
