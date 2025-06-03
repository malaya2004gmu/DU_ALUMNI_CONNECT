import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";
const Navbar = () => {
  const { user, logout } = useAuth(); // user = { role: 'admin' | 'alumni' | 'user', name: '...' }
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-white">
        Alumni Portal
      </Link>

      <ul className="flex space-x-6">
        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/courses">Courses</Link>
            </li>
            <li>
              <Link to="/admin/events">Events</Link>
            </li>
            <li>
              <Link to="/admin/job-posts">Job Posts</Link>
            </li>
            <li>
              <Link to="/admin/reports">Reports</Link>
            </li>
          </>
        )}

        {user?.role === "alumni" && (
          <>
            <li>
              <Link to="/alumni/profile" className="flex items-center gap-2">
                <FaUser />
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/alumni/post-job">Post Job</Link>
            </li>
            <li>
              <Link to="/alumni/events">Events</Link>
            </li>
            <li>
              <Link to="/alumni/my-jobs">My Posts</Link>
            </li>
          </>
        )}

        {!user && (
          <>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/jobs">Job Posts</Link>
            </li>
          </>
        )}
      </ul>

      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
