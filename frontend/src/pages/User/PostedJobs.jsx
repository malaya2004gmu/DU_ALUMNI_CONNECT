import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/job-posts")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <>
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Apply For Jobs</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">UserId</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Salary</th>
              <th className="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className="border px-4 py-2">{job.postedBy.email}</td>
                <td className="border px-4 py-2">{job.title}</td>
                <td className="border px-4 py-2">{job.company}</td>
                <td className="border px-4 py-2">{job.location}</td>
                <td className="border px-4 py-2">₹ {job.salary}</td>
                <td className="border px-4 py-2">{job.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
    <Footer />
    </>
  );
};

export default PostedJobs;
