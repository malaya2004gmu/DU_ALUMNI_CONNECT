import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
const PostJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    applyLink: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await authFetch("http://localhost:5000/api/add/job-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to post job");
        return;
      }
      alert("Job posted successfully!");
      navigate("/alumni/my-jobs");
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl animate-fade-in">
          <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10 tracking-tight">
            🚀 Post a New Job
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: "Job Title", name: "title" },
              { label: "Company", name: "company" },
              { label: "Location", name: "location" },
              { label: "Salary", name: "salary" },
              { label: "Apply Link", name: "applyLink" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-gray-700 font-semibold mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  required={name !== "salary"}
                />
              </div>
            ))}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Job Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the job responsibilities, requirements, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                rows={6}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 font-semibold text-lg shadow-md"
            >
              Post Job 🎯
            </button>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default PostJob;
