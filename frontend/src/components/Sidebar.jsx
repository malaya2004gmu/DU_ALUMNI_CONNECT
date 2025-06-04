import React from "react";
import { Link } from "react-router-dom";

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
        {/* Course Dropdown */}
        <li className="nav-item">
          <span className="nav-link text-white">Course</span>
          <ul className="nav flex-column ms-3">
            <li>
              <Link to="/admin/add-course" className="nav-link text-white">
                Add Course
              </Link>
            </li>
            <li>
              <Link to="/admin/delete-course" className="nav-link text-white">
                Delete Course
              </Link>
            </li>
          </ul>
        </li>
        {/* Events Dropdown */}
        <li className="nav-item">
          <span className="nav-link text-white">Events</span>
          <ul className="nav flex-column ms-3">
            <li>
              <Link to="/admin/add-event" className="nav-link text-white">
                Add Event
              </Link>
            </li>
            <li>
              <Link to="/admin/delete-event" className="nav-link text-white">
                Delete Event
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/admin/alumni" className="nav-link text-white">
            Alumni List
          </Link>
        </li>
        {/* Job Posts Dropdown */}
        <li className="nav-item">
          <span className="nav-link text-white">Job Posts</span>
          <ul className="nav flex-column ms-3">
            <li>
              <Link to="/admin/job-posts/approve" className="nav-link text-white">
                Approve
              </Link>
            </li>
            <li>
              <Link to="/admin/job-posts/delete" className="nav-link text-white">
                Delete
              </Link>
            </li>
          </ul>
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