import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaComments,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-900 text-white px-4 sm:px-8 py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-white flex-shrink-0"
        >
          DU<span className="text-yellow-400">Alumni</span>Connect
        </Link>

        {/* Hamburger Button */}
        <button
          className="text-white sm:hidden text-2xl ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 text-sm font-medium items-center ml-auto">
          {user?.role === "admin" && (
            <>
              <li>
                <Link to="/admin/dashboard" className="hover:text-yellow-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/courses" className="hover:text-yellow-300">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/admin/events" className="hover:text-yellow-300">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/admin/job-posts" className="hover:text-yellow-300">
                  Job Posts
                </Link>
              </li>
              <li>
                <Link to="/admin/reports" className="hover:text-yellow-300">
                  Reports
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/post-feed" className="hover:text-blue-600">
                  Community
                </Link>
              </li>
            </>
          )}
          {user?.role === "alumni" && (
            <>
              <li>
                <Link
                  to="/alumni/profile"
                  className="hover:text-yellow-300 flex items-center gap-1"
                >
                  <FaUser />
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/alumni/post-job" className="hover:text-yellow-300">
                  Post Job
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-yellow-300">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/alumni/my-jobs" className="hover:text-yellow-300">
                  My Jobs Posts
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/post-feed" className="hover:text-blue-600">
                  Community
                </Link>
              </li>
            </>
          )}
          {user?.role === "user" && (
            <>
              <li>
                <Link
                  to="/alumni/profile"
                  className="hover:text-yellow-300 flex items-center gap-1"
                >
                  <FaUser />
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-yellow-300">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/posted-jobs" className="hover:text-yellow-300">
                  Job Posts
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/post-feed" className="hover:text-blue-600">
                  Community
                </Link>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link to="/events" className="hover:text-yellow-300">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/posted-jobs" className="hover:text-yellow-300">
                  Job Posts
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Profile + Messaging + Logout/Login */}
        <div className="hidden sm:flex items-center gap-4 ml-6">
          {user && user.role !== "admin" && (
            <Link
              to="/chat"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              title="Messages"
            >
              <FaComments />
              Message
            </Link>
          )}
          {user ? (
            <>
              <img
                src={
                  user.photo
                    ? `https://du-alumni-connect.onrender.com/${user.photo}`
                    : "/images/demoprofile.png"
                }
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
              <span className="text-yellow-300 text-xs font-semibold uppercase">
                {user.role === "user" ? "Student" : user.role}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              <FaSignInAlt />
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="sm:hidden absolute left-0 top-full w-full bg-blue-900 shadow-lg mt-0 py-4 px-6 space-y-3 text-sm font-medium z-40">
          {user?.role === "admin" && (
            <>
              <li>
                <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/courses" onClick={() => setMenuOpen(false)}>
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/admin/events" onClick={() => setMenuOpen(false)}>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/admin/job-posts" onClick={() => setMenuOpen(false)}>
                  Job Posts
                </Link>
              </li>
              <li>
                <Link to="/admin/reports" onClick={() => setMenuOpen(false)}>
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/post-feed" onClick={() => setMenuOpen(false)}>
                  Community
                </Link>
              </li>
            </>
          )}
          {user?.role === "alumni" && (
            <>
              <li>
                <Link to="/alumni/profile" onClick={() => setMenuOpen(false)}>
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/alumni/post-job" onClick={() => setMenuOpen(false)}>
                  Post Job
                </Link>
              </li>
              <li>
                <Link to="/events" onClick={() => setMenuOpen(false)}>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/alumni/my-jobs" onClick={() => setMenuOpen(false)}>
                  My Jobs Posts
                </Link>
              </li>
              <li>
                <Link to="/post-feed" onClick={() => setMenuOpen(false)}>
                  Community
                </Link>
              </li>
            </>
          )}
          {user?.role === "user" && (
            <>
              <li>
                <Link to="/alumni/profile" onClick={() => setMenuOpen(false)}>
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/events" onClick={() => setMenuOpen(false)}>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/posted-jobs" onClick={() => setMenuOpen(false)}>
                  Job Posts
                </Link>
              </li>
              <li>
                <Link to="/post-feed" onClick={() => setMenuOpen(false)}>
                  Community
                </Link>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link to="/events" onClick={() => setMenuOpen(false)}>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/posted-jobs" onClick={() => setMenuOpen(false)}>
                  Job Posts
                </Link>
              </li>
            </>
          )}

          {/* Messaging button for mobile */}
          {user && user.role !== "admin" && (
            <li>
              <Link
                to="/chat"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => setMenuOpen(false)}
              >
                <FaComments />
                Message
              </Link>
            </li>
          )}

          {/* Auth button for mobile */}
          <li className="mt-2">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                <FaSignOutAlt />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                onClick={() => setMenuOpen(false)}
              >
                <FaSignInAlt />
                Login
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
