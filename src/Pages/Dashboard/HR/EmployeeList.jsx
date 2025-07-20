import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const EmployeeList = () => {
  const [empList, setEmpList] = useState([]);
  const [payEmp, setPayEmp] = useState(null);
  const [payMonth, setPayMonth] = useState("");
  const [payYear, setPayYear] = useState("");
  const [isTableView, setIsTableView] = useState(true); // <-- toggle state

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/employees").then((res) => setEmpList(res.data));
  }, [axiosSecure]);

  const handleToggleVerified = (id, currentStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to mark this employee as ${
        currentStatus ? "Unverified" : "Verified"
      }.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/employees/${id}/toggle-verified`)
          .then((res) => {
            if (res.data.success) {
              setEmpList((prev) =>
                prev.map((emp) =>
                  emp._id === id ? { ...emp, verified: res.data.verified } : emp
                )
              );

              Swal.fire({
                title: "Updated!",
                text: `Employee verification status changed to ${
                  res.data.verified ? "Verified" : "Unverified"
                }.`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: "Something went wrong!",
              icon: "error",
            });
          });
      }
    });
  };

  const handleCreatePaymentRequest = () => {
    if (!payMonth || !payYear) {
      Swal.fire("Error", "Please enter Month and Year", "error");
      return;
    }

    const paymentRequest = {
      employee_id: payEmp._id,
      employee_name: payEmp.name,
      employee_email: payEmp.email,
      salary: payEmp.salary,
      bank_account_no: payEmp.bank_account_no,
      month: payMonth,
      year: payYear,
      status: "Pending",
      requested_at: new Date(),
    };

    axiosSecure
      .post("/payroll", paymentRequest)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire(
            "Request Created",
            "Payment request sent for approval",
            "success"
          );
          setPayEmp(null);
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Something went wrong";
        Swal.fire("Error", message, "error");
      });
  };

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Employee List</h1>

      {/* Toggle Button */}
      <button
        onClick={() => setIsTableView(!isTableView)}
        className="btn bg-green-500 mb-6"
      >
        {isTableView ? "Switch to Card View" : "Switch to Table View"}
      </button>

      {/* Table View */}
      {isTableView && (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Bank Account</th>
              <th>Salary</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {empList.map((emp, index) => (
              <tr key={emp._id}>
                <th>{index + 1}</th>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>
                  <button
                    onClick={() => handleToggleVerified(emp._id, emp.verified)}
                    className="btn btn-sm"
                  >
                    {emp.verified === false ? (
                      <>
                        False <AiOutlineClose size={20} color="red" />
                      </>
                    ) : (
                      <>
                        True <AiOutlineCheck size={20} color="green" />
                      </>
                    )}
                  </button>
                </td>
                <td>{emp.bank_account_no}</td>
                <td>{emp.salary}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => navigate(`/dashboard/details/${emp._id}`)}
                    className="btn btn-sm"
                  >
                    Details
                  </button>
                  <button
                    className={`btn btn-sm ${
                      !emp.verified ? "cursor-not-allowed" : ""
                    }`}
                    disabled={!emp.verified}
                    onClick={() => {
                      setPayEmp(emp);
                      setPayMonth("");
                      setPayYear("");
                    }}
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Card Grid View */}
      {!isTableView && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {empList.map((emp) => (
            <div
              key={emp._id}
              className="border border-green-300 rounded-lg p-4 shadow hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2">{emp.name}</h2>
              <p>
                <strong>Email:</strong> {emp.email}
              </p>
              <p className="flex items-center">
                <strong>Verified:</strong>
                <button
                  onClick={() => handleToggleVerified(emp._id, emp.verified)}
                  className="ml-2 btn btn-sm"
                >
                  {emp.verified === false ? (
                    <>
                      False <AiOutlineClose size={16} color="red" />
                    </>
                  ) : (
                    <>
                      True <AiOutlineCheck size={16} color="green" />
                    </>
                  )}
                </button>
              </p>
              <p>
                <strong>Bank Account:</strong> {emp.bank_account_no}
              </p>
              <p>
                <strong>Salary:</strong> {emp.salary}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => navigate(`/dashboard/details/${emp._id}`)}
                  className="btn btn-sm flex-grow"
                >
                  Details
                </button>
                <button
                  className={`btn btn-sm flex-grow ${
                    !emp.verified ? "cursor-not-allowed" : ""
                  }`}
                  disabled={!emp.verified}
                  onClick={() => {
                    setPayEmp(emp);
                    setPayMonth("");
                    setPayYear("");
                  }}
                >
                  Pay
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pay Modal */}
      {payEmp && (
        <dialog
          id="pay_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Pay {payEmp.name}</h3>
            <div className="space-y-2">
              <div>
                <label className="label">Salary</label>
                <input
                  type="number"
                  value={payEmp.salary}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">Month</label>
                <input
                  type="text"
                  value={payMonth}
                  onChange={(e) => setPayMonth(e.target.value)}
                  placeholder="e.g., July"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">Year</label>
                <input
                  type="text"
                  value={payYear}
                  onChange={(e) => setPayYear(e.target.value)}
                  placeholder="e.g., 2025"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={handleCreatePaymentRequest}>
                Pay
              </button>
              <button className="btn btn-ghost" onClick={() => setPayEmp(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default EmployeeList;
