import React, { useEffect, useState } from "react";
const { authFetch } = require( "../../utils/authFetch"); 
const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authFetch("https://du-alumni-connect.onrender.com/api/admin/approved-jobs")
      .then((res) => {
        if(!res) return;
        return res.json();
      })
      .then((data) => {
        if(data)setJobs(data);
      });

    //  Check if user is logged in (e.g., check localStorage for token or userId)
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 ">
        <main className="flex-1 overflow-x-auto p-6 animate-fade-in">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Explore Job Opportunities
          </h2>

          <div className="overflow-x-auto shadow-md rounded-lg bg-white p-4">
            { jobs.length === 0  ? (
              <div className="text-center text-gray-500 p-4">No job yet</div>
            ) : (
              <table className="min-w-full overflow-x-auto table-auto text-sm text-gray-700">
                <thead>
                  <tr className="bg-blue-100 text-blue-800 text-left">
                    <th className="px-4 py-3">Posted By</th>
                    <th className="px-4 py-3">Job Role</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Salary</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Apply</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr
                      key={job._id}
                      className="hover:bg-blue-50 border-b border-gray-200"
                    >
                      <td className="px-4 py-3">{job.postedBy?.email}</td>
                      <td className="px-4 py-3 font-medium text-blue-900">
                        {job.title}
                      </td>
                      <td className="px-4 py-3">{job.company}</td>
                      <td className="px-4 py-3">{job.location}</td>
                      <td className="px-4 py-3">₹ {job.salary}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {job.description?.slice(0, 100)}...
                      </td>
                      <td className="px-4 py-3">
                        {isLoggedIn ? (
                          <a
                            href={job.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Apply Now
                          </a>
                        ) : (
                          <span className="text-red-500 italic">
                            Login to apply
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default PostedJobs;
