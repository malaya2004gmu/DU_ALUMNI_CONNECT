import React, { useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import Sidebar from "./Sidebar";

const MyPostsPage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const res = await authFetch("https://du-alumni-connect.onrender.com/api/post/my-posts");
      const data = await res.json();

      if (!res.ok || !Array.isArray(data)) {
        console.error("Failed to fetch my posts");
        setLoading(false);
        return;
      }

      setMyPosts(data);
    } catch (err) {
      console.error("Error fetching my posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {

    try {
      const res = await authFetch(`https://du-alumni-connect.onrender.com/api/post/post-delete/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete post.");
        return;
      }

      // Refresh posts list
      setMyPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">My Posts</h1>

        {loading ? (
          <div className="text-center text-gray-500 text-lg mt-10">Loading...</div>
        ) : myPosts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            You haven't posted anything yet.
          </div>
        ) : (
          myPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6 p-6 relative"
            >
              {/* Delete Button Top Right */}
              <button
                onClick={() => handleDelete(post._id)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
                title="Delete Post"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>

              {/* Author Info */}
              <div className="flex items-center mb-4">
                <img
                  src={
                    post.author?.photo
                      ? `https://du-alumni-connect.onrender.com/${post.author.photo}`
                      : "/default-avatar.png"
                  }
                  alt="Author"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{post.author?.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Post Title & Content */}
              <h2 className="text-xl font-bold mb-3 text-gray-900">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <img
                  src={`https://du-alumni-connect.onrender.com/${post.image}`}
                  alt="Post"
                  className="rounded-lg w-full max-h-80 object-cover mb-4"
                />
              )}

              {/* Reactions */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-red-500">favorite</span>
                    {post.likes.length} Likes
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-blue-500">comment</span>
                    {post.comments.length} Comments
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPostsPage;
