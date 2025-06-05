import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaGlobe,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-600 text-white py-6 shadow-inner">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
      {/* Left - Branding */}
      <div className="text-center md:text-left text-sm md:text-base">
        <span className="font-semibold text-lg text-blue-300">DU Alumni Connect</span> &copy;{" "}
        {new Date().getFullYear()}
      </div>

      {/* Center - Social Icons */}
      <div className="flex items-center space-x-5 text-blue-400 text-lg">
        <a
          href="https://www.du.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          title="University Website"
          className="hover:text-white transition duration-300"
        >
          <FaGlobe />
        </a>
        <a
          href="https://instagram.com/yourdualumni"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className="hover:text-white transition duration-300"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/yourdualumni"
          target="_blank"
          rel="noopener noreferrer"
          title="Twitter"
          className="hover:text-white transition duration-300"
        >
          <FaTwitter />
        </a>
        <a
          href="mailto:support@dualumni.com"
          title="Email"
          className="hover:text-white transition duration-300"
        >
          <FaEnvelope />
        </a>
      </div>

      {/* Right - Tagline */}
      <div className="text-sm md:text-base text-center md:text-right">
        Made with <FaHeart className="inline text-red-500" /> by Your Team
      </div>
    </div>
  </footer>
);

export default Footer;
