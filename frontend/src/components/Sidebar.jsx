import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-900 text-yellow-400 p-2 rounded-full shadow-lg"
        onClick={() => setOpen(!open)}
        aria-label="Open sidebar"
      >
        <FaBars size={22} />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-blue-950 text-white shadow-lg z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block md:min-h-screen md:w-64 pt-20 px-4
        `}
      >
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
              onClick={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
                >
                  Add Course
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/delete-course"
                  className="block hover:bg-blue-800 px-4 py-2 rounded transition"
                  onClick={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
                >
                  Add Event
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/delete-event"
                  className="block hover:bg-blue-800 px-4 py-2 rounded transition"
                  onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
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
                  to="/admin/approved-jobs"
                  className="block hover:bg-blue-800 px-4 py-2 rounded transition"
                  onClick={() => setOpen(false)}
                >
                  Approve
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/delete-job"
                  className="block hover:bg-blue-800 px-4 py-2 rounded transition"
                  onClick={() => setOpen(false)}
                >
                  Delete
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;