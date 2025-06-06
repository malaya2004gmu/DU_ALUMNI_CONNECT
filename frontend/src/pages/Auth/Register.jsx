import React, { useState ,useEffect} from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    password: "",
    role: "user",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("https://du-alumni-connect.onrender.com/api/admin/courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to load courses. Please try again later.");
      }
    };
    fetchCourses();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, contactNumber, email, password, role } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("contactNumber", contactNumber);
    data.append("email", email);
    data.append("password", password);
    data.append("role", role);
    data.append("course", formData.course);
    if (photo) data.append("photo", photo);

    try {
      const res = await fetch("https://du-alumni-connect.onrender.com/api/auth/register", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please log in.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-lg animate-fade-in"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Create Your Account
        </h2>

        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Contact Number", name: "contactNumber", type: "text", placeholder: "1234567890" },
          { label: "Email", name: "email", type: "email", placeholder: "test@gmail.com" },
        ].map(({ label, name, type, placeholder }) => (
          <div className="mb-5" key={name}>
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-1">Profile Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
            onChange={handlePhotoChange}
          />
        </div>

        {[
          { label: "Password", name: "password", value: formData.password },
          { label: "Confirm Password", name: "confirmPassword", value: confirmPassword },
        ].map(({ label, name, value }) => (
          <div className="mb-5" key={name}>
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
              type="password"
              name={name}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={value}
              onChange={
                name === "confirmPassword"
                  ? (e) => setConfirmPassword(e.target.value)
                  : handleChange
              }
              required
            />
          </div>
        ))}

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          >
            <option value="user">Student</option>
            <option value="alumni">Alumni</option>
            
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold tracking-wide"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
