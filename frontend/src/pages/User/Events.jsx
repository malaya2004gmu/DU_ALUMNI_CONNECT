import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://du-alumni-connect.onrender.com/api/admin/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
        <main className="flex-1 p-6 animate-fade-in overflow-x-auto">
          <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">All Events</h2>
          <div className="overflow-x-auto shadow-md rounded-lg bg-white p-4">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead>
                <tr className="bg-blue-100 text-blue-800 text-left">
                  <th className=" px-4 py-3">Event Name</th>
                  <th className=" px-4 py-3">Date</th>
                  <th className="px-4 py-3">Location</th>
                  <th className=" px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {events.length > 0 ? (
                  events.map((event) => (
                    <tr key={event._id} className="hover:bg-blue-50 border-b border-gray-200">
                      <td className="px-4 py-2">{event.title}</td>
                      <td className=" px-4 py-2">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">{event.location}</td>
                      <td className=" px-4 py-2">
                        <button
                          onClick={() => handleDetails(event._id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition duration-200"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border px-4 py-6 text-center text-gray-500">
                      No events available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
     
    </>
  );
};

export default Events;
