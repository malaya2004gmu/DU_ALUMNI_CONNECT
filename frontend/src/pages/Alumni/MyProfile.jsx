import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../utils/authFetch";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden animate-fade-in">
        <div className="grid md:grid-cols-3 gap-10 p-10">
          <div className="flex flex-col items-center text-center md:col-span-1">
            <img
              src={preview || "http://via.placeholder.com/150"}
              alt="Profile"
              className="w-44 h-44 rounded-full object-cover border-4 border-blue-400 shadow-md mb-4"
            />
            <h2 className="text-3xl font-bold text-blue-800 mb-1">
              {form.name}
            </h2>
            <p className="text-gray-600 text-lg">{user?.email}</p>
            <p className="text-lg text-gray-500 capitalize">
              Role: {user?.role}
            </p>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium animate-fade-in"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Details or Edit Form */}
          <div className="md:col-span-2">
            {!editing ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Full Name
                  </h3>
                  <p className="text-gray-700 text-lg">{form.name}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-700 text-lg">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Contact Number
                  </h3>
                  <p className="text-gray-700 text-lg">{form.contactNumber}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Course
                  </h3>
                  <p className="text-gray-700 text-lg">{form.course || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Year of Admission
                  </h3>
                  <p className="text-gray-700 text-lg">{form.year || "N/A"}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 ">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={form.contactNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Course
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Year of Admission
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 ">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full text-sm text-gray-500"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium animate-fade-in"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition font-medium animate-fade-in"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;