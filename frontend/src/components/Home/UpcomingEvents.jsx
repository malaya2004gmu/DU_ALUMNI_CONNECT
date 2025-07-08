import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    authFetch("https://du-alumni-connect.onrender.com/api/admin/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br animate-fade-in">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          🌟 Upcoming Events
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.length > 0 ? (
            events.slice(0, 3).map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-blue-400 transition duration-300"
              >
                {/* Event Image */}
                <div className="h-48 bg-gray-200">
                  <img
                    src={`https://du-alumni-connect.onrender.com/${event.photo}` || "/images/event-placeholder.jpg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Event Details */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    📅{" "}
                    {event.date
                      ? new Date(event.date).toLocaleDateString()
                      : "TBA"}{" "}
                    | 📍 {event.location}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                    {event.description}
                  </p>
                  <Link
                    to={`/events/${event._id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-12">
              No upcoming events.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
