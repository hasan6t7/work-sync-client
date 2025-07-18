import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Progress = () => {
  const axiosSecure = useAxiosSecure();
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    axiosSecure
      .get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  // Fetch progress data based on filters
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
      <h1 className="text-2xl font-bold text-center mb-6">Employee Progress</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select
          className="select select-bordered"
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
          className="select select-bordered"
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
          className="btn btn-sm btn-outline"
          onClick={() => {
            setSelectedEmployee("");
            setSelectedMonth("");
          }}
        >
          Reset Filters
        </button>
      </div>

      {loading && <p className="text-center mt-6">Loading...</p>}
      {error && <p className="text-center mt-6 text-red-500">{error}</p>}

      <div className="overflow-x-auto mt-4">
        <table className="table table-zebra">
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
                  <td>
                    
                    <span className="">
                      {record.email}
                    </span>
                  </td>
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
    </div>
  );
};

export default Progress;
