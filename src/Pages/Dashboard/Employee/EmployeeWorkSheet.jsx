import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EmployeeWorkSheet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [workSheetData, setWorkSheetData] = useState([]);
  const [tasks] = useState(["Sales", "Support", "Content", "Paper-work"]);

  const [formData, setFormData] = useState({
    task: "Sales",
    hoursWorked: "",
    date: new Date(),
  });

  // For toggling between views: "table" or "grid"
  const [viewMode, setViewMode] = useState("table");

  // ---------edit------------
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFormData, setEditingFormData] = useState({
    _id: "",
    task: "",
    hoursWorked: "",
    date: new Date(),
  });

  // Fetch worksheet data on mount and when user or axiosSecure changes
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get("/work-sheet/employees", {
        params: { email: user.email },
      })
      .then((res) => setWorkSheetData(res.data))
      .catch(() => {
        toast.error("Failed to fetch worksheet data");
      });
  }, [user, axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const openEditModal = (data) => {
    setEditingFormData({
      _id: data._id,
      task: data.task,
      hoursWorked: data.hoursWorked,
      date: new Date(data.date),
    });
    setIsEditModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.hoursWorked) {
      toast.error("Hours Worked is required");
      return;
    }
    const newEntry = {
      ...formData,
      email: user.email,
      date: formData.date.toISOString(),
      hoursWorked: Number(formData.hoursWorked),
    };

    axiosSecure.post("/work-sheet/employees", newEntry).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Worksheet Data Submitted!",
        });
        // Reload data after insert
        axiosSecure
          .get("/work-sheet/employees", { params: { email: user.email } })
          .then((res) => setWorkSheetData(res.data));
        // Reset form
        setFormData({ task: "Sales", hoursWorked: "", date: new Date() });
      }
    });
  };

  // delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/work-sheet/employees/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your worksheet entry has been deleted.",
                "success"
              );
              setWorkSheetData((prev) =>
                prev.filter((item) => item._id !== id)
              );
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete the worksheet.", "error");
          });
      }
    });
  };

  // ---------update --------
  const handleUpdate = () => {
    const updatedEntry = {
      task: editingFormData.task,
      hoursWorked: Number(editingFormData.hoursWorked),
      date: editingFormData.date.toISOString(),
    };

    axiosSecure
      .patch(`/work-sheet/employees/${editingFormData._id}`, updatedEntry)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire(
            "Updated!",
            "Worksheet entry updated successfully.",
            "success"
          );
          setWorkSheetData((prev) =>
            prev.map((item) =>
              item._id === editingFormData._id
                ? { ...item, ...updatedEntry }
                : item
            )
          );
          setIsEditModalOpen(false);
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update worksheet.", "error");
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Work Sheet</h2>

      {/* View toggle button */}
      <div className="mb-4">
        <button
          onClick={() =>
            setViewMode((prev) => (prev === "table" ? "grid" : "table"))
          }
          className="bg-green-500  px-4 py-2 rounded hover:bg-green-700"
        >
          Switch to {viewMode === "table" ? "Card Grid View" : "Table View"}
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-3 items-center mb-6"
      >
        <select
          name="task"
          value={formData.task}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          {tasks.map((task) => (
            <option key={task} value={task}>
              {task}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="hoursWorked"
          placeholder="Hours Worked"
          value={formData.hoursWorked}
          onChange={handleChange}
          className="border p-2 rounded w-32"
          required
        />
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          className="border p-2 rounded"
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {/* Conditional rendering of Table or Grid */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Work</th>
                <th>Work Hour</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {workSheetData.map((data, index) => (
                <tr key={data._id}>
                  <th>{index + 1}</th>
                  <td>{data.task}</td>
                  <td>{data.hoursWorked}</td>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openEditModal(data)}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {workSheetData.map((data, index) => (
            <div
              key={data._id}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">
                #{index + 1} - {data.task}
              </h3>
              <p>
                <strong>Hours Worked:</strong> {data.hoursWorked}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(data.date).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleDelete(data._id)}
                  className="btn btn-sm btn-error flex-1"
                >
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(data)}
                  className="btn btn-sm btn-primary flex-1"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <input
        type="checkbox"
        id="edit-modal"
        className="modal-toggle"
        checked={isEditModalOpen}
        readOnly
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Worksheet</h3>

          <select
            name="task"
            value={editingFormData.task}
            onChange={(e) =>
              setEditingFormData({ ...editingFormData, task: e.target.value })
            }
            className="select select-bordered w-full mb-4"
          >
            {tasks.map((task) => (
              <option key={task} value={task}>
                {task}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="hoursWorked"
            value={editingFormData.hoursWorked}
            onChange={(e) =>
              setEditingFormData({
                ...editingFormData,
                hoursWorked: e.target.value,
              })
            }
            className="input input-bordered w-full mb-4"
            placeholder="Hours Worked"
          />

          <DatePicker
            selected={editingFormData.date}
            onChange={(date) =>
              setEditingFormData({ ...editingFormData, date })
            }
            className="input input-bordered w-full mb-4"
            dateFormat="yyyy-MM-dd"
          />

          <div className="modal-action">
            <label onClick={() => setIsEditModalOpen(false)} className="btn">
              Cancel
            </label>
            <button onClick={handleUpdate} className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeWorkSheet;
