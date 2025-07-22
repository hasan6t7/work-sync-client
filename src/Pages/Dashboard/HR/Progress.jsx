import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const Progress = () => {
  const axiosSecure = useAxiosSecure();
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTableView, setIsTableView] = useState(true); // toggle state

  useEffect(() => {
    axiosSecure
      .get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  useEffect(() => {
    setLoading(true);
    setError("");

    const params = {};
    if (selectedEmployee) params.employee = selectedEmployee;
    if (selectedMonth) params.month = selectedMonth;

    axiosSecure
      .get("/progress", { params })
      .then((res) => {
        setRecords(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Can't find in work records.");
        setLoading(false);
      });
  }, [selectedEmployee, selectedMonth, axiosSecure]);

  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "long" });
  };

  const getYear = (dateString) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Helmet>
        <title>Progress</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-6">Employee Progress</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center mb-6">
        <select
          className="select select-bordered w-full"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">All Employees</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp.email}>
              {emp.name || emp.email}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-full"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <button
          className="btn btn-outline w-full"
          onClick={() => {
            setSelectedEmployee("");
            setSelectedMonth("");
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* Toggle View Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="btn bg-green-500 w-full lg:w-1/3"
        >
          {isTableView ? "Switch to Card View" : "Switch to Table View"}
        </button>
      </div>

      {/* Loading and Error */}
      {loading && <p className="text-center mt-6">Loading...</p>}
      {error && <p className="text-center mt-6 text-red-500">{error}</p>}

      {/* Table View */}
      {isTableView && (
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee</th>
                <th>Task</th>
                <th>Hours Worked</th>
                <th>Month</th>
                <th>Year</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((record, idx) => (
                  <tr key={record._id}>
                    <td>{idx + 1}</td>
                    <td>{record.email}</td>
                    <td>{record.task}</td>
                    <td>{record.hoursWorked}</td>
                    <td>{getMonthName(record.date)}</td>
                    <td>{getYear(record.date)}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Card Grid View */}
      {!isTableView && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {records.length > 0 ? (
            records.map((record, idx) => (
              <div
                key={record._id}
                className="border border-green-300 rounded-lg p-4 shadow hover:shadow-xl transition"
              >
                <p>
                  <strong>#{idx + 1}</strong>
                </p>
                <p>
                  <strong>Employee:</strong> {record.email}
                </p>
                <p>
                  <strong>Task:</strong> {record.task}
                </p>
                <p>
                  <strong>Hours Worked:</strong> {record.hoursWorked}
                </p>
                <p>
                  <strong>Month:</strong> {getMonthName(record.date)}
                </p>
                <p>
                  <strong>Year:</strong> {getYear(record.date)}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(record.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No records found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Progress;
