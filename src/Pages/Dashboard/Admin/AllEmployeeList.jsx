import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import Swal from "sweetalert2";

const AllEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  const verifiedEmployees = users?.filter(
    (user) =>
      user.verified === true && (user.role === "Employee" || user.role === "HR")
  );

  const makeHR = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to promote this user to HR.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, promote",
    });

    if (!confirmResult.isConfirmed) {
      return; // user cancelled
    }

    try {
      await axiosSecure.patch(`/users/${id}/role`);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: "HR" } : user
        )
      );

      await Swal.fire({
        icon: "success",
        title: "Promoted!",
        text: "User has been promoted to HR successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to promote user to HR.",
      });
    }
  };

  const fireEmployee = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to fire this employee. They will lose access immediately.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, fire",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    try {
      await axiosSecure.patch(`/users/${id}/fire`);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, fired: true } : user
        )
      );

      await Swal.fire({
        icon: "success",
        title: "Fired!",
        text: "User has been fired successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fire user.",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Verified Employees</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Designation
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Make HR
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Fire
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {verifiedEmployees.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No verified employees found.
                </td>
              </tr>
            ) : (
              verifiedEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.designation}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => makeHR(employee._id)}
                      disabled={employee.role === "HR"}
                      className={`px-3 py-1 rounded text-xs ${
                        employee.role === "HR"
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
                      }`}
                    >
                      {employee.role === "HR" ? "Already HR" : "Make HR"}
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    {employee.fired ? (
                      <span className="text-red-500 font-semibold text-xs">
                        Fired
                      </span>
                    ) : (
                      <button
                        onClick={() => fireEmployee(employee._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                      >
                        Fire
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployeeList;
