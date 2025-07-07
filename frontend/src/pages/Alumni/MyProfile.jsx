import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../utils/authFetch";
import { Camera, Edit3, Save, X, User, Phone, BookOpen, Calendar } from "lucide-react";

const MyProfile = () => {
  const { user, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    photo: "",
    course: "",
    year: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        contactNumber: user.contactNumber || "",
        photo: user.photo || "",
        course: user.course || "",
        year: user.year || "",
      });
      setPreview(user.photo ? `http://localhost:5000/${user.photo}` : "");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("contactNumber", form.contactNumber);
    data.append("course", form.course);
    data.append("year", form.year);
    if (photoFile) data.append("photo", photoFile);

    try {
      const res = await authFetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message || "Update failed");
        return;
      }
      alert("Profile updated!");
      login(result.user);
      setEditing(false);
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl hover:shadow-blue-500 border border-white/20 overflow-hidden">
          {/* Cover Section */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Profile Picture Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                  <img
                    src={preview || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || "User")}&background=6366f1&color=fff&size=128`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {editing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-1">
                  {form.name || "Your Name"}
                </h2>
                <p className="text-gray-600 text-lg mb-2">{user?.email}</p>
                <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
                  <span className="text-sm font-medium text-blue-800 capitalize">
                    {user?.role}
                  </span>
                </div>
              </div>

              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Content Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              {!editing ? (
                <>
                  {/* Profile Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                        <User className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium text-gray-800">{form.name || "Not provided"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                        <Phone className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-500">Contact Number</p>
                          <p className="font-medium text-gray-800">{form.contactNumber || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">Course</p>
                          <p className="font-medium text-gray-800">{form.course || "Not provided"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="text-sm text-gray-500">Year of Admission</p>
                          <p className="font-medium text-gray-800">{form.year || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Contact Number
                        </label>
                        <input
                          type="text"
                          name="contactNumber"
                          value={form.contactNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                          placeholder="Enter your contact number"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Course
                        </label>
                        <input
                          type="text"
                          name="course"
                          value={form.course}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                          placeholder="Enter your course"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Year of Admission
                        </label>
                        <input
                          type="text"
                          name="year"
                          value={form.year}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                          placeholder="Enter admission year"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
