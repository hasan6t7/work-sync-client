import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Helmet } from "react-helmet";


const EmployeeDetails = () => {
  const { slug } = useParams();
  const axiosSecure = useAxiosSecure();
  const [employee, setEmployee] = useState(null);
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/employee-details/${slug}`)
      .then((res) => {
        setEmployee(res.data.employee);
        setPayrolls(res.data.payrolls);
      })
      .catch((err) => console.error(err));
  }, [slug, axiosSecure]);

  if (!employee) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <Helmet>
        <title>Employee Details</title>
      </Helmet>
      <div className="flex flex-col items-center gap-4 mb-8">
        <img
          src={employee.photo}
          alt={employee.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
        />
        <h1 className="text-2xl font-bold">{employee.name}</h1>
        <p className="text-lg text-gray-600">{employee.designation}</p>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={payrolls.map((p) => ({
              monthYear: `${p.month} ${p.year}`,
              salary: p.salary,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthYear" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="salary" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeDetails;
