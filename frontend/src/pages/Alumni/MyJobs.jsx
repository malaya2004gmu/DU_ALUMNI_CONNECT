import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../utils/authFetch"; 
import Footer from "../../components/Footer";

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
    <>
      <div className="flex min-h-screen bg-gray-100">
        <main className="flex-1 p-6 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">My Job Posts</h2>
          <div className="overflow-x-auto rounded shadow bg-white">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-blue-50 text-blue-800 font-semibold">
                <tr>
                  <th className="border px-4 py-3">Title</th>
                  <th className="border px-4 py-3">Company</th>
                  <th className="border px-4 py-3">Location</th>
                  <th className="border px-4 py-3">Salary</th>
                  <th className="border px-4 py-3">Description</th>
                  <th className="border px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(jobs) && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2 text-gray-900">{job.title}</td>
                      <td className="border px-4 py-2 text-gray-700">{job.company}</td>
                      <td className="border px-4 py-2 text-gray-700">{job.location}</td>
                      <td className="border px-4 py-2 text-gray-700">₹ {job.salary}</td>
                      <td className="border px-4 py-2 text-gray-700">{job.description}</td>
                      <td
                        className={`border px-4 py-2 font-semibold ${
                          job.status === "pending"
                            ? "text-yellow-600"
                            : job.status === "rejected"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {job.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      You haven’t posted any jobs yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MyJobs;
