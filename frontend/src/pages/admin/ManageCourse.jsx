import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import { authFetch } from "../../utils/authFetch";
const ManageCourses = () => {
  const { user,loading } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if(loading)return;
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user,loading, navigate]);

  useEffect(() => {
    authFetch("https://du-alumni-connect.onrender.com/api/admin/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="flex  min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 overflow-x-auto">Manage Courses</h2>
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-blue-50 text-blue-800 font-semibold">
              <tr>
                <th className="px-4 py-3 border">Course Name</th>
                <th className="px-4 py-3 border">Description</th>
                <th className="px-4 py-3 border">Duration</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-medium text-gray-900">{course.name}</td>
                  <td className="border px-4 py-2 text-gray-700 max-w-xl truncate">{course.description}</td>
                  <td className="border px-4 py-2 text-gray-600">{course.duration}</td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No courses available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageCourses;
