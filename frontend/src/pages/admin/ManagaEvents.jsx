import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const { user,loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(loading) return;
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user,loading, navigate]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="flex  min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 animate-fade-in overflow-x-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Manage Events</h2>
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-blue-50 text-blue-800 font-semibold">
              <tr>
                <th className="px-4 py-3 border">Title</th>
                <th className="px-4 py-3 border">Description</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">Location</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 font-medium text-gray-900">{event.title}</td>
                    <td className="border px-4 py-2 text-gray-700 max-w-md truncate">
                      {event.description}
                    </td>
                    <td className="border px-4 py-2 text-gray-600">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2 text-gray-600">{event.location}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No events found.
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

export default ManageEvents;
