import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://du-alumni-connect-iuuu-1zqxbiob6-malaya2004gmus-projects.vercel.app/api/admin/add-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: courseName,
          duration: courseDuration,
          description: courseDescription,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Course added successfully!");
        setCourseName("");
        setCourseDuration("");
        setCourseDescription("");
        navigate("/admin/courses");
      } else {
        setMessage("❌ Failed to add course: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Add New Course</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              placeholder="Enter course name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Duration</label>
            <input
              type="text"
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              placeholder="e.g. 6 weeks, 3 months"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              rows="4"
              placeholder="Write a brief course overview"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Add Course
          </button>
        </form>

        {message && (
          <div className="mt-5 text-center font-medium text-green-600 animate-fade-in">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourse;
