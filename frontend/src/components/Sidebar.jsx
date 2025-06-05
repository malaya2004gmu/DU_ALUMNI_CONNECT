import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-blue-950 text-white min-h-screen w-64 px-6 py-8 shadow-lg">
      {/* Logo/Heading */}
      <h2 className="text-2xl font-bold mb-8 text-center text-yellow-400">
        ADMIN
      </h2>

      <ul className="space-y-4 text-sm font-medium">
        {/* Dashboard */}
        <li>
          <Link
            to="/admin/dashboard"
            className="block hover:bg-blue-800 px-4 py-2 rounded transition"
          >
            Dashboard
          </Link>
        </li>

        {/* Courses */}
        <li>
          <div className="text-gray-300 uppercase text-xs tracking-wider mb-1">
            Courses
          </div>
          <ul className="pl-2 space-y-2">
            <li>
              <Link
                to="/admin/add-course"
                className="block hover:bg-blue-800 px-4 py-2 rounded transition"
              >
                Add Course
              </Link>
            </li>
            <li>
              <Link
                to="/admin/delete-course"
                className="block hover:bg-blue-800 px-4 py-2 rounded transition"
              >
                Delete Course
              </Link>
            </li>
          </ul>
        </li>

        {/* Events */}
        <li>
          <div className="text-gray-300 uppercase text-xs tracking-wider mb-1">
            Events
          </div>
          <ul className="pl-2 space-y-2">
            <li>
              <Link
                to="/admin/add-event"
                className="block hover:bg-blue-800 px-4 py-2 rounded transition"
              >
                Add Event
              </Link>
            </li>
            <li>
              <Link
                to="/admin/delete-event"
                className="block hover:bg-blue-800 px-4 py-2 rounded transition"
              >
                Delete Event
              </Link>
            </li>
          </ul>
        </li>

        {/* Alumni */}
        <li>
          <Link
            to="/admin/alumni"
            className="block hover:bg-blue-800 px-4 py-2 rounded transition"
          >
            Alumni List
          </Link>
        </li>

        {/* Job Posts */}
        <li>
          <div className="text-gray-300 uppercase text-xs tracking-wider mb-1">
            Job Posts
          </div>
          <ul className="pl-2 space-y-2">
            <li>
              <Link
                to="/admin/job-posts/approve"
                className="block hover:bg-blue-800 px-4 py-2 rounded transition"
              >
                Approve
              </Link>
            </li>
            <li>
              <Link
                to="/admin/job-posts/delete"
                className="block hover:bg-blue-800 px-4 py-2 rounded transition"
              >
                Delete
              </Link>
            </li>
          </ul>
        </li>

        {/* Reports */}
        <li>
          <Link
            to="/admin/report"
            className="block hover:bg-blue-800 px-4 py-2 rounded transition"
          >
            Report
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
