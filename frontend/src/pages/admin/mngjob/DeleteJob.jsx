import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteJob = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/job-posts")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/admin/delete-job/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setJobs(jobs.filter((job) => job._id !== id));
      setMessage("Job deleted successfully!");
    } else {
      setMessage("Failed to delete Job");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-5xl animate-fade-in overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Delete Job</h2>
        {message && (
          <div className="mb-4 text-center text-green-600 font-semibold">
            {message}
          </div>
        )}
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Posted By</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Job Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Manage</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className=" px-4 py-2">{job.postedBy.email}</td>
                <td className=" px-4 py-2">{job.title}</td>
                <td className=" px-4 py-2">{job.company}</td>
                <td className={`px-4 py-2 font-semibold ${job.status==="rejected"?"text-red-600":job.status==="approved"?"text-green-600":"text-gray-700"}`}>{job.status}</td>
                <td className=" px-4 py-2">
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteJob;