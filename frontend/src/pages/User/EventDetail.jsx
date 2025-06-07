import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://du-alumni-connect.onrender.com/api/admin/event-details/${eventId}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch(() => setEvent(null));
  }, [eventId]);

  if (!event) {
    return (
      <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 animate-fade-in">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-center">Event Details</h2>
          <p className="text-gray-500">Event not found.</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
      
      </>
    );
  }

  return (
    <>
    <div className="flex  min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">{event.title}</h2>
        {event.photo && (
          <div className="mb-4 flex justify-center">
            <img
              src={`https://du-alumni-connect.onrender.com/${event.photo}`}
              alt={event.title}
              className="max-h-100 rounded shadow"
            />
          </div>
        )}
        <div className="mb-2">
          <span className="font-semibold">Date: </span>
          {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Location: </span>
          {event.location}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Description: </span>
          {event.description}
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
   
    </>
  );
};

export default EventDetails;