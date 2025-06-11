import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const DeleteCourse = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all courses from backend
    fetch("http://localhost:5000/api/admin/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/admin/delete-course/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setCourses(courses.filter((course) => course._id !== id));
      setMessage("Course deleted successfully!");
    } else {
      setMessage("Failed to delete course.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-5xl animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center">Delete Course</h2>
        {message && (
          <div className="mb-4 text-center text-green-600 font-semibold">
            {message}
          </div>
        )}
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Course Name</th>
              
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="border px-4 py-2">{course.name}</td>
               
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteCourse;