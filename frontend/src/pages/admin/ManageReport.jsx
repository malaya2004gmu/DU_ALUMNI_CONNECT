import React, { useState, useEffect ,useCallback} from "react";
import Sidebar from "../../components/Sidebar";

import { authFetch } from "../../utils/authFetch";
const Reports = () => {
  const [filters, setFilters] = useState({
    role: "",
    fromDate: "",
    course: "",
    batchYear: "",
  });
  const [reportData, setReportData] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

   const fetchReports = useCallback(async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await authFetch(`http://localhost:5000/api/admin/reports?${query}`);
    const data = await res.json();
    setReportData(data);
  }, [filters]);

  const fetchCourses = async () => {
    const res = await authFetch("http://localhost:5000/api/admin/courses");
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchReports();
    fetchCourses();
  }, [fetchReports]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1  p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
          User Reports
        </h2>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded shadow mb-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <select
            name="role"
            onChange={handleChange}
            className="border p-2 rounded"
            value={filters.role}
          >
            <option value="">All Roles</option>
            <option value="alumni">Alumni</option>
            <option value="user">Student</option>
          </select>

          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="course"
            onChange={handleChange}
            className="border p-2 rounded"
            value={filters.course}
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course._id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>

          <select
            name="batchYear"
            onChange={handleChange}
            className="border p-2 rounded"
            value={filters.batchYear}
          >
            <option value="">Select Batch Year</option>
            {Array.from(
              { length: new Date().getFullYear() - 1999 },
              (_, i) => 2000 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button
            onClick={fetchReports}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 sm:col-span-2 md:col-span-3 lg:col-span-1"
          >
            Search
          </button>
        </div>

        {/* Report Table */}
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Course</th>
                <th className="px-4 py-2 text-left">Batch Year</th>
                <th className="px-4 py-2 text-left">Registered</th>
              </tr>
            </thead>
            <tbody>
              {reportData.length > 0 ? (
                reportData.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2">{user.course || "-"}</td>
                    <td className="px-4 py-2">{user.year || "-"}</td>
                    <td className="px-4 py-2">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
