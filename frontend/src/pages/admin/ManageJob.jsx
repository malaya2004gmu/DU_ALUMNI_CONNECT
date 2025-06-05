import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/job-posts")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const handleApprove = (jobId) => {
    fetch(`http://localhost:5000/api/admin/approve-job/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJobs((prevJobs) =>
            prevJobs.map((job) =>
              job._id === jobId ? { ...job, status: "approved" } : job
            )
          );
        } else {
          alert("Failed to approve job post");
        }
      });
  };

  const handleReject = (jobId) => {
    fetch(`http://localhost:5000/api/admin/reject-job/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJobs((prevJobs) =>
            prevJobs.map((job) =>
              job._id === jobId ? { ...job, status: "rejected" } : job
            )
          );
        } else {
          alert("Failed to reject job post");
        }
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Manage Job Posts</h2>
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-blue-50 text-blue-800 font-semibold">
              <tr>
                <th className="px-4 py-3 border">User Email</th>
                <th className="px-4 py-3 border">Title</th>
                <th className="px-4 py-3 border">Company</th>
                <th className="px-4 py-3 border">Location</th>
                <th className="px-4 py-3 border">Salary</th>
                <th className="px-4 py-3 border">Description</th>
                <th className="px-4 py-3 border">Status</th>
                <th className="px-4 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{job.postedBy.email}</td>
                  <td className="border px-4 py-2">{job.title}</td>
                  <td className="border px-4 py-2">{job.company}</td>
                  <td className="border px-4 py-2">{job.location}</td>
                  <td className="border px-4 py-2">₹{job.salary}</td>
                  <td className="border px-4 py-2 max-w-xs truncate">{job.description}</td>
                  <td
                    className={`border px-4 py-2 font-semibold ${
                      job.status === "pending"
                        ? "text-yellow-500"
                        : job.status === "approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {job.status}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleApprove(job._id)}
                      disabled={job.status === "approved"}
                      className={`px-3 py-1 rounded text-white font-medium transition ${
                        job.status === "approved"
                          ? "bg-green-300 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(job._id)}
                      disabled={job.status === "rejected"}
                      className={`px-3 py-1 rounded text-white font-medium transition ${
                        job.status === "rejected"
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No job posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageJobs;
