import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../utils/authFetch"; 
// Assuming you have a utility for authenticated fetch requests
const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.role !== "alumni") {
      navigate("/login");
    }
  }, [user, navigate]);
  useEffect(() => {
    authFetch("http://localhost:5000/api/alumni/my-jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Job Posts</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Salary</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(jobs) ? jobs : []).map((job) => (
              <tr key={job._id}>
                <td className="border px-4 py-2">{job.title}</td>
                <td className="border px-4 py-2">{job.company}</td>
                <td className="border px-4 py-2">{job.location}</td>
                <td className="border px-4 py-2">{job.salary}</td>
                <td className="border px-4 py-2">{job.description}</td>
                <td className="border px-4 py-2">{job.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default MyJobs;
