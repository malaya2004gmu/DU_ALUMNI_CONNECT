import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../utils/authFetch";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "alumni") {
      navigate("/error");
    }
  }, [user, loading, navigate]);

  const fetchJobs = () => {
    authFetch("http://localhost:5000/api/alumni/my-jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await authFetch(`http://localhost:5000/api/alumni/delete-job/${jobId}`, {
        method: "DELETE",
      });
      if (res.status===200) {
        setJobs((prev) => prev.filter((job) => job._id !== jobId));
      } else {
        alert("Failed to delete job.");
      }
    } catch (err) {
      alert("Error deleting job.");
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <main className="flex-1 p-6 animate-fade-in overflow-x-auto">
          <h2 className="text-3xl text-center font-bold mb-6 text-blue-700">My Posted Jobs</h2>
          <div className="overflow-x-auto rounded shadow bg-white">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-blue-50 text-blue-800 font-semibold">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Salary</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(jobs) && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-900">{job.title}</td>
                      <td className="px-4 py-2 text-gray-700">{job.company}</td>
                      <td className="px-4 py-2 text-gray-700">{job.location}</td>
                      <td className="px-4 py-2 text-gray-700">₹ {job.salary}</td>
                      <td className="px-4 py-2 text-gray-700">{job.description}</td>
                      <td
                        className={`px-4 py-2 font-semibold ${
                          job.status === "pending"
                            ? "text-yellow-600"
                            : job.status === "rejected"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {job.status}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      You haven’t posted any jobs yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default MyJobs;