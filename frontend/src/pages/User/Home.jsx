import React,{useEffect,useState} from "react";
import Slider from "../../components/Slider";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import FeatureCard from "../../components/FeatureCard";
const Home = () => {
  const features = [
    {
      title: "Connect with Alumni",
      description: "Engage and interact with alumni to build your professional network.",
    },
    {
      title: "Job Opportunities",
      description: "Find job postings from trusted alumni working across the industry.",
    },
    {
      title: "Events & Webinars",
      description: "Stay updated on alumni events, reunions, and workshops.",
    },
  ];
  const testimonials = [
  {
    text: "This platform helped me land a great opportunity through alumni referrals!",
    author: "Riya Sharma, MCA 2018",
  },
  {
    text: "Love how easy it is to stay connected with my batchmates and join events.",
    author: "Arjun Verma, MSC 2019",
  },
  {
    text: "Love how easy it is to stay connected with my batchmates and join events.",
    author: "Chandan Sahu, MCA 2021",
  },
  
];
  //events 
  const [events,setEvents]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:5000/api/admin/events")
    .then((res)=>res.json()).then((data)=>setEvents(data));
  },[]);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setAnimate(true);
      }, 400); // match the animation duration
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  return (
    <>
      <div className="bg-white text-gray-800 min-h-screen" style={{minWidth:"30vh"}}>
        <Slider />

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-blue-800 to-indigo-900 text-white text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Welcome to DU Alumni Connect</h1>
          <p className="text-lg mb-6">Stay connected, explore opportunities, and grow with your alumni network.</p>
          <Link
            to="/login"
            className="inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition"
          >
            Get Started
          </Link>
        </section>

        {/* Features Section */}
        <section className="bg-gray-100 py-10 px-6 sm:px-12 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-8">Why Join DUAlumniConnect?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

        {/* Event Highlights */}
        <section className="py-12 bg-gray-100 animate-fade-in">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-8">Upcoming Events</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {events.length > 0 ? (
                events.slice(0, 3).map((event) => (
                  <div key={event._id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                    <h4 className="text-blue-700 font-semibold text-lg">{event.title}</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {event.date ? new Date(event.date).toLocaleDateString() : ""} | {event.location}
                    </p>
                    <p className="text-sm">{event.description}</p>
                    <Link to={`/events/${event._id}`} className="text-blue-600 mt-2 inline-block">
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
        {/* Testimonials */}
        <section className="py-12 bg-white text-center">
          <h2 className="text-2xl font-bold mb-8">What Alumni Say</h2>
          <div className="max-w-2xl mx-auto relative">
            <div
              className={`p-6 border rounded shadow-sm bg-gray-50 min-h-[140px] flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
              style={{ willChange: "opacity, transform" }}
            >
              <p className="italic text-lg">"{testimonials[currentTestimonial].text}"</p>
              <p className="mt-4 text-sm font-semibold text-blue-700">
                - {testimonials[currentTestimonial].author}
              </p>
            </div>
            <div className="flex justify-center mt-4 gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAnimate(false);
                    setTimeout(() => {
                      setCurrentTestimonial(idx);
                      setAnimate(true);
                    }, 400);
                  }}
                  className={`w-3 h-3 rounded-full ${idx === currentTestimonial ? "bg-blue-700" : "bg-gray-300"}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
        {/* Final Call to Action */}
        <section className="py-10 bg-blue-800 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Start Connecting Today</h2>
          <p className="mb-6">Be a part of a growing network of DU alumni making a difference.</p>
          <Link
            to="/register"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-2 rounded-full transition"
          >
            Join Now
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
