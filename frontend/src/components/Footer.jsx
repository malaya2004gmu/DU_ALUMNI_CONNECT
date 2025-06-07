import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaGlobe,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 py-6 shadow-inner mt-auto">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-8">
      
      {/* Branding */}
      <div className="text-center md:text-left">
        <h2 className="text-xl font-semibold text-blue-400">DU Alumni Connect</h2>
        <p className="text-sm mt-1">&copy; {new Date().getFullYear()} All rights reserved</p>
      </div>

      {/* Social Links */}
      <div className="flex space-x-5 text-xl text-blue-400">
        <a
          href="http://www.du.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          title="University Website"
          className="hover:text-white transition"
        >
          <FaGlobe />
        </a>
        <a
          href="http://instagram.com/yourdualumni"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className="hover:text-white transition"
        >
          <FaInstagram />
        </a>
        <a
          href="http://twitter.com/yourdualumni"
          target="_blank"
          rel="noopener noreferrer"
          title="Twitter"
          className="hover:text-white transition"
        >
          <FaTwitter />
        </a>
        <a
          href="mailto:supportadmindualumni@gmail.com"
          title="Email"
          className="hover:text-white transition"
        >
          <FaEnvelope />
        </a>
      </div>

      {/* Tagline */}
      <div className="text-center md:text-right text-sm">
        Made with <FaHeart className="inline text-red-500 animate-pulse" /> by Our Team
      </div>
    </div>
  </footer>
);

export default Footer;
