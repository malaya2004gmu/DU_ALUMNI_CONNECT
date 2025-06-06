import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const ManageAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch("https://du-alumni-connect-iuuu-1zqxbiob6-malaya2004gmus-projects.vercel.app/api/admin/alumni")
      .then((res) => res.json())
      .then((data) => setAlumni(data));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Manage Alumni</h2>
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-blue-50 text-blue-800 font-semibold">
              <tr>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Contact</th>
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
