import React from "react";
import { Link } from "react-router-dom";
import { FaChalkboard, FaUsers, FaClipboardList } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h4 className="mb-4">DU ALUMNI</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/courses" className="nav-link text-white">
            Course
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/events" className="nav-link text-white">
            Events
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/alumni" className="nav-link text-white">
            Alumni List
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/job-posts" className="nav-link text-white">
            Job Posts
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/report" className="nav-link text-white">
            Report
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
