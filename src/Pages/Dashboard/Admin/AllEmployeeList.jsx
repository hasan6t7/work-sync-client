import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../Components/Loader/Loader";
import { Helmet } from "react-helmet";

const AllEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableView, setIsTableView] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newSalary, setNewSalary] = useState("");

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
      return;
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

  const openAdjustSalaryModal = (user) => {
    setSelectedUser(user);
    setNewSalary("");
    document.getElementById("adjust_salary_modal").showModal();
  };

  const handleAdjustSalary = async () => {
    if (!newSalary || Number(newSalary) <= selectedUser.salary) {
      document.getElementById("adjust_salary_modal").close();
      Swal.fire({
        icon: "error",
        title: "Invalid Salary",
        text: "New salary must be greater than current salary.",
      });
      return;
    }

    try {
      await axiosSecure.patch(`/users/${selectedUser._id}/adjust-salary`, {
        newSalary: Number(newSalary),
      });
      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUser._id ? { ...u, salary: Number(newSalary) } : u
        )
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Salary updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      document.getElementById("adjust_salary_modal").close();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update salary.",
      });
    }
  };

  if (loading) {
    return <Loader></Loader>
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Helmet>
        <title>All Employee</title>
      </Helmet>
      {/* Adjust Salary Modal */}
      <dialog id="adjust_salary_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Adjust Salary</h3>
          {selectedUser && (
            <div className="mt-4 space-y-2">
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Current Salary:</strong> ${selectedUser.salary}
              </p>
              <input
                type="number"
                placeholder="Enter new salary"
                className="input input-bordered w-full"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
              />
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button onClick={handleAdjustSalary} className="btn btn-primary">
              Update Salary
            </button>
          </div>
        </div>
      </dialog>

      <div className="lg:flex lg:justify-between lg:items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 lg:mb-0">Verified Employees</h2>
        <br />
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Switch to {isTableView ? "Card Grid View" : "Table View"}
        </button>
      </div>

      {isTableView ? (
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
                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                  Adjust Salary
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {verifiedEmployees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
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
                            : "bg-blue-500 text-white hover:bg-blue-600"
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
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openAdjustSalaryModal(employee)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                      >
                        Adjust Salary
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {verifiedEmployees.length === 0 ? (
            <p className="text-gray-500">No verified employees found.</p>
          ) : (
            verifiedEmployees.map((employee) => (
              <div
                key={employee._id}
                className="border border-green-300 rounded-lg p-4 shadow hover:shadow-xl transition"
              >
                <h3 className="text-lg font-semibold">{employee.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {employee.designation}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => makeHR(employee._id)}
                    disabled={employee.role === "HR"}
                    className={`px-3 py-1 rounded text-xs ${
                      employee.role === "HR"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {employee.role === "HR" ? "Already HR" : "Make HR"}
                  </button>
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
                  <button
                    onClick={() => openAdjustSalaryModal(employee)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                  >
                    Adjust Salary
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;
