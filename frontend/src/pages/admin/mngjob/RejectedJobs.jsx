import React, { useEffect, useState } from "react";
import { authFetch } from "../../../utils/authFetch";
const RejectedJobs = () => {
  const [rejectedJobs, setRejectedJobs] = useState([]);

  useEffect(() => {
    authFetch("http://localhost:5000/api/admin/job-posts")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((job) => job.status !== "approved");
        setRejectedJobs(filtered);
      })
      .catch((err) => console.error("Error fetching rejected jobs:", err));
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 p-6 animate-fade-in overflow-x-auto">
          <h2 className="text-2xl text-center font-bold mb-6 text-blue-900">Rejected Jobs</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Posted By</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Job Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Salary</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rejectedJobs.length > 0 ? (
                  rejectedJobs.map((job) => (
                    <tr key={job._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{job.postedBy.email || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{job.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₹ {job.salary}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{job.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No rejected jobs found.
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

export default RejectedJobs;
