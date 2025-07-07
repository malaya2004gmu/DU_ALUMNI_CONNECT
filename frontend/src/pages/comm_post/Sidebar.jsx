import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to check if path is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-blue-50 p-6 shadow-md hidden md:block">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Community</h2>
      <ul className="space-y-2 text-gray-700">
        <li>
          <button
            onClick={() => navigate("/post-feed")}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive("/post-feed") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:text-blue-600"
            }`}
          >
            <span className="material-symbols-outlined">home</span>
            CommunityPosts
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/create-post")}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive("/create-post") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:text-blue-600"
            }`}
          >
            <span className="material-symbols-outlined">add_circle</span>
            Add Post
          </button>
        </li>

        <li>
          <button
            onClick={() => navigate("/comm-profile")}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive("/alumni/profile") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:text-blue-600"
            }`}
          >
            <span className="material-symbols-outlined">person</span>
            My Profile
          </button>
        </li>

        <li>
          <button
            onClick={() => navigate("/my-comm-posts")}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive("/my-comm-posts") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:text-blue-600"
            }`}
          >
            <span className="material-symbols-outlined">article</span>
            My Posts
          </button>
        </li>

        
      </ul>
    </div>
  );
};

export default Sidebar;
