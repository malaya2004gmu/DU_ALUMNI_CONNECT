import React ,{useEffect,useState} from "react";
import { Link } from "react-router-dom";

const UpcomingEvents =()=>{
      const [events, setEvents] = useState([]);
       useEffect(() => {
         fetch("https://du-alumni-connect.onrender.com/api/admin/events")
           .then((res) => res.json())
           .then((data) => setEvents(data));
       }, []);
    return(
      <section className="py-12 bg-gray-100 animate-fade-in">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              Upcoming Events
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {events.length > 0 ? (
                events.slice(0, 3).map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
                  >
                    <h4 className="text-blue-700 font-semibold text-lg">
                     <marquee behavior="" direction="left">{event.title}</marquee> 
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : ""}{" "}
                      | {event.location}
                    </p>
                    <p className="text-sm">{event.description}</p>
                    <Link
                      to={`/events/${event._id}`}
                      className="text-blue-600 mt-2 inline-block"
                    >
                      View Details →
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-500 py-8">
                  No upcoming events.
                </div>
              )}
            </div>
          </div>
        </section>
    );
};

export default UpcomingEvents;