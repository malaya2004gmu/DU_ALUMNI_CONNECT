import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth(); // user = { role: 'admin' | 'alumni' | 'user', name: '...' }
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold tracking-wide text-white">
        DU<span className="text-yellow-400">Alumni</span>Connect
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-sm font-medium items-center">
        {user?.role === "admin" && (
          <>
            <li>
              <Link
                to="/admin/dashboard"
                className="hover:text-yellow-300 transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/courses"
                className="hover:text-yellow-300 transition"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/admin/events"
                className="hover:text-yellow-300 transition"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/admin/job-posts"
                className="hover:text-yellow-300 transition"
              >
                Job Posts
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reports"
                className="hover:text-yellow-300 transition"
              >
                Reports
              </Link>
            </li>
          </>
        )}

        {user?.role === "alumni" && (
          <>
            <li>
              <Link
                to="/alumni/profile"
                className="hover:text-yellow-300 transition flex items-center gap-1"
              >
                <FaUser />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/alumni/post-job"
                className="hover:text-yellow-300 transition"
              >
                Post Job
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-yellow-300 transition">
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/alumni/my-jobs"
                className="hover:text-yellow-300 transition"
              >
                My Posts
              </Link>
            </li>
          </>
        )}
        {user?.role === "user" && (
          <>
            <li>
              <Link
                to="/alumni/profile"
                className="hover:text-yellow-300 transition flex items-center gap-1"
              >
                <FaUser />
                My Profile
              </Link>
            </li>

            <li>
              <Link to="/events" className="hover:text-yellow-300 transition">
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/posted-jobs"
                className="hover:text-yellow-300 transition"
              >
                Job Posts
              </Link>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link to="/events" className="hover:text-yellow-300 transition">
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/posted-jobs"
                className="hover:text-yellow-300 transition"
              >
                Job Posts
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Right Action Button */}
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <img
              src={
                user.photo
                  ? `https://du-alumni-connect.onrender.com/${user.photo}`
                  : "/images/demoprofile.png"
              }
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-white object-cover"
            />
            <span className="ml-2 font-semibold uppercase text-xs tracking-wider text-yellow-300">
              {user.role === "admin"
                ? "ADMIN"
                : user.role === "alumni"
                ? "ALUMNI"
                : "STUDENT"}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
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
    </nav>
  );
};

export default Navbar;
