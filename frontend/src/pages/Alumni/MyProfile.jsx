import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const MyProfile = () => {
  const { user, login } = useAuth();
  console.log("user", user);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    photo: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    console.log("user:", user);
    if (user) {
      setForm({
        name: user.name || "",
        contactNumber: user.contactNumber || "",
        photo: user.photo || "",
      });
      setPreview(user.photo ? `http://localhost:5000/${user.photo}` : "");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("contactNumber", form.contactNumber);
    if (photoFile) data.append("photo", photoFile);

    try {
      console.log("updating waiting ....");
      const res = await fetch("http://localhost:5000/api/auth/profile", {
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
    <div className="min-h-screen p-10 bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden min-h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          {/* Profile Image and Summary */}
          <div className="flex flex-col items-center text-center col-span-1">
            <img
              src={preview || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-60 h-60 rounded-full object-cover border-4 border-blue-400 mb-4"
            />
            <h2 className="text-4xl font-semibold">{form.name}</h2>
            <p className="text-gray-600 text-2xl">{user?.email}</p>
            <p className="text-2xl text-gray-500 capitalize">
              Role: {user?.role}
            </p>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Details or Form */}
          <div className="md:col-span-2">
            {!editing ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold">Full Name</h3>
                  <p className="text-gray-700">{form.name}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Email</h3>
                  <p className="  text-gray-700">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Contact Number</h3>
                  <p className="text-gray-700">{form.contactNumber}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={form.contactNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Change Profile Pic
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
                    onClick={() => setEditing(false)}
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
