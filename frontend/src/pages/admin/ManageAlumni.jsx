import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { authFetch } from "../../utils/authFetch";
const ManageAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  useEffect(() => {
    authFetch("https://du-alumni-connect.onrender.com/api/admin/alumni")
      .then((res) => res.json())
      .then((data) => setAlumni(data));
  }, []);

  return (
    <div className="flex  min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 animate-fade-in overflow-x-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Manage Alumni</h2>
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-blue-50 text-blue-800 font-semibold">
              <tr>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Contact</th>
                <th className="px-4 py-3 border">Course</th>
                <th className="px-4 py-3 border">YearOfAdm.</th>
              </tr>
            </thead>
            <tbody>
              {alumni.length > 0 ? (
                alumni.map((alum) => (
                  <tr key={alum._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 text-gray-900 font-medium">
                      {alum.name}
                    </td>
                    <td className="border px-4 py-2 text-gray-700">{alum.email}</td>
                    <td className="border px-4 py-2 text-gray-700">{alum.contactNumber}</td>
                    <td className="border px-4 py-2 text-gray-700">{alum.course}</td>
                    <td className="border px-4 py-2 text-gray-700">{alum.year}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No alumni records found.
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

export default ManageAlumni;
