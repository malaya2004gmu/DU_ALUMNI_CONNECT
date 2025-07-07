import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://du-alumni-connect.onrender.com/api/admin/event-details/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => {
        setEvent(null);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
            📅
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-4">
            Sorry, we couldn't find the event. It might be removed or the link is incorrect.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 border border-blue-200 rounded-md hover:bg-blue-50 text-blue-700 flex items-center"
        >
          ← Back to Events
        </button>

        <div className="bg-white rounded-xl shadow-xl hover:shadow-blue-500 overflow-hidden">
          {event.photo && (
            <div className="relative h-64">
              <img
                src={`https://du-alumni-connect.onrender.com/${event.photo}`}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/50 px-4 py-2 text-white rounded-lg">
                🌟 Featured Event
              </div>
            </div>
          )}

          <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">{event.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex gap-3 items-start bg-blue-50 p-4 rounded-md border">
                <span className="text-blue-600 text-lg">📅</span>
                <div>
                  <p className="text-sm font-medium text-blue-800">Date</p>
                  <p className="text-blue-700">
                    {event.date
                      ? new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "TBD"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-green-50 p-4 rounded-md border">
                <span className="text-green-600 text-lg">📍</span>
                <div>
                  <p className="text-sm font-medium text-green-800">Location</p>
                  <p className="text-green-700">{event.location || "TBD"}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-purple-50 p-4 rounded-md border">
                <span className="text-purple-600 text-lg">👥</span>
                <div>
                  <p className="text-sm font-medium text-purple-800">Attendees</p>
                  <p className="text-purple-700">Join the community</p>
                </div>
              </div>
            </div>

            {event.description && (
              <div className="bg-gray-50 p-6 rounded-lg border text-gray-800 mb-6">
                <h2 className="text-xl font-semibold mb-3">About This Event</h2>
                <p>{event.description}</p>
              </div>
            )}

            
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Have questions? Contact our support team for more info.
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
