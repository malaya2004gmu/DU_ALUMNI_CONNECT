// src/api/communityApi.js
import { authFetch } from "../../utils/authFetch";

export const fetchPosts = async () => {
  const res = await authFetch("http://localhost:5000/api/post");
  const data = await res.json();
  if (!res.ok || !Array.isArray(data)) throw new Error("Failed to fetch posts");
  return data;
};

export const likePost = async (postId) => {
  const res = await authFetch(`http://localhost:5000/api/post/like/${postId}`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Failed to like post");
  return res;
};

export const submitComment = async (postId, text) => {
  const res = await authFetch(`http://localhost:5000/api/post/comment/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return res;
};

export const deleteComment = async (postId, commentId) => {
  const res = await authFetch(`http://localhost:5000/api/post/${postId}/comment/${commentId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return res;
};
