import React, { useState } from "react";
import { authFetch } from "../../utils/authFetch";
import Sidebar from "./Sidebar";
import { PenTool, Image, Send, CheckCircle, Globe, User, Briefcase, MoreHorizontal } from "lucide-react";

const CreatePost = () => {
  const [form, setForm] = useState({ title: "", content: "", category: "travel" });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category);
    if (image) formData.append("image", image);

    try {
      const res = await authFetch("http://localhost:5000/api/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Something went wrong while creating the post");
        return;
      }

      setForm({ title: "", content: "", category: "travel" });
      setImage(null);
      setImagePreview("");
      setMessage("✅ Post uploaded successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert("Error: not created post " + err.message);
      console.error("Post creation error:", err);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "travel": return <Globe className="w-4 h-4" />;
      case "lifestyle": return <User className="w-4 h-4" />;
      case "career": return <Briefcase className="w-4 h-4" />;
      default: return <MoreHorizontal className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-start py-8 px-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full shadow-lg">
                <PenTool className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Add Your Post To Community
            </h1>
            <p className="text-gray-600 text-lg">Share your thoughts and experiences with the community</p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-8 mx-auto max-w-2xl">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 flex items-center justify-center space-x-3 shadow-sm">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="text-green-700 font-medium">{message}</p>
              </div>
            </div>
          )}

          {/* Main Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-blue-500 border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                <PenTool className="w-6 h-6" />
                <span>New Post</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Post Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter an engaging title for your post..."
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-lg placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Content Textarea */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Share your story, thoughts, or experiences..."
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows="8"
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-lg placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-lg appearance-none cursor-pointer"
                  >
                    <option value="travel">🌍 Travel & Adventure</option>
                    <option value="lifestyle">🏖️ Lifestyle & Wellness</option>
                    <option value="career">💼 Career & Business</option>
                    <option value="other">📌 Other Topics</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    {getCategoryIcon(form.category)}
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="relative">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Image className="w-8 h-8 text-blue-600 mx-auto" />
                      </div>
                      <p className="text-gray-600 font-medium mb-2">
                        {image ? "Change Image" : "Upload an Image"}
                      </p>
                      <p className="text-sm text-gray-400">
                        Drag and drop or click to browse
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview("");
                      }}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 text-lg"
                >
                  <Send className="w-6 h-6" />
                  <span>Publish Post</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Your post will be visible to all community members once published
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
