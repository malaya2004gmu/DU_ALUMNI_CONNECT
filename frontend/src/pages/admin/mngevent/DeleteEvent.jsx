import React, { useEffect, useState } from "react";
import { authFetch } from "../../../utils/authFetch";
const DeleteEvent = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    authFetch("https://du-alumni-connect.onrender.com/api/admin/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleDelete = async (id) => {
    const res = await authFetch(`https://du-alumni-connect.onrender.com/api/admin/delete-event/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setEvents(events.filter((event) => event._id !== id));
      setMessage("Event deleted successfully!");
    } else {
      setMessage("Failed to delete event");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-5xl animate-fade-in overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Delete Event</h2>
        {message && (
          <div className="mb-4 text-center text-green-600 font-semibold">
            {message}
          </div>
        )}
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Event Name</th>
              
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td className="border px-4 py-2">{event.title}</td>
               
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteEvent;