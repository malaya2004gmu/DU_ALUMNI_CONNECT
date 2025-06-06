import React from "react";
import { Link } from "react-router-dom";
const HeroSection =()=>{
    return (
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
    );
};
export default HeroSection;