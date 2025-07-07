import React, {  useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";
import {
  fetchPosts,
  likePost,
  submitComment,
  deleteComment,
} from "./helperMethod";
const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [commentBoxOpen, setCommentBoxOpen] = useState(null);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      console.error("Error loading posts:", err);
    }
  };

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      loadPosts();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!newComment.trim()) return;
    try {
      await submitComment(postId, newComment);
      setNewComment("");
      setCommentBoxOpen(null);
      loadPosts();
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await deleteComment(postId, commentId);
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? {
                ...p,
                comments: p.comments.filter((c) => c._id !== commentId),
              }
            : p
        )
      );
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Community Posts
        </h1>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            No posts yet. Be the first to share something!
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6 p-6"
            >
              {/* Author Info */}
              <div className="flex items-center mb-4">
                <img
                  src={
                    post.author?.photo
                      ? `http://localhost:5000/${post.author.photo}`
                      : "/default-avatar.png"
                  }
                  alt="Author"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {post.author?.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Post Title & Content */}
              <h2 className="text-xl font-bold mb-3 text-gray-900">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-4">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt="Post"
                  className="rounded-lg w-full max-h-80 object-cover mb-4"
                />
              )}

              {/* Reactions Row */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-red-500 text-base">
                      favorite
                    </span>
                    {post.likes.length} Likes
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-blue-500 text-base">
                      comment
                    </span>
                    {post.comments.length} Comments
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-4 flex items-center justify-between">
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500"
                >
                  <span className="material-symbols-outlined">favorite</span>{" "}
                  Like
                </button>
                <button
                  onClick={() =>
                    setCommentBoxOpen(
                      commentBoxOpen === post._id ? null : post._id
                    )
                  }
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
                >
                  <span className="material-symbols-outlined">comment</span>{" "}
                  Comment
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600">
                  <span className="material-symbols-outlined">share</span> Share
                </button>
              </div>

              {/* Comment Box */}
              {commentBoxOpen === post._id && (
                <div className="mt-4 bg-white p-5 rounded-xl shadow-md border border-gray-200">
                  {/* Previous Comments */}
                  {post.comments.length > 0 ? (
                    <div className="mb-4 space-y-4">
                      <h4 className="text-base font-semibold text-blue-700 border-b pb-1">
                        Comments
                      </h4>
                      {post.comments.map((comment, index) => (
                        <div
                          key={index}
                          className="relative bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm"
                        >
                          <p className="text-gray-800 text-sm">
                            {comment.text}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 italic">
                            — {comment.user?.name || "Anonymous"}
                          </p>

                          {/* Delete icon for comment author only */}
                          {comment.user?._id === user?._id && (
                            <button
                              onClick={() =>
                                handleDeleteComment(post._id, comment._id)
                              }
                              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                              title="Delete Comment"
                            >
                              <span className="material-symbols-outlined text-base">
                                delete
                              </span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic mb-4">
                      No comments yet. Be the first to comment!
                    </p>
                  )}

                  {/* Comment Input Box */}
                  <div className="space-y-1">
                    <textarea
                      rows="2"
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      onClick={() => handleCommentSubmit(post._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-sm"
                    >
                      💬 Post Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
