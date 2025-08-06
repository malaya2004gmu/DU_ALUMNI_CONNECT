import React, { useState, useEffect } from "react";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    password: "",
    role: "user",
    course: "",
    year: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [courses, setCourses] = useState([]);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState(""); // Message state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("https://du-alumni-connect.onrender.com/api/auth/user/courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setMessage("Failed to load courses. Please try again later.");
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

  const handleSendOtp = async () => {
    setMessage("");
    if (!formData.email) {
      setMessage("Please enter your email first.");
      return;
    }
    try {
      const res = await fetch("https://du-alumni-connect.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setMessage("OTP sent to your email.");
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setMessage("Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    setMessage("");
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }
    try {
      const res = await fetch("https://du-alumni-connect.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpVerified(true);
        setMessage("OTP verified! You can now register.");
      } else {
        setMessage(data.message || "OTP verification failed");
      }
    } catch (err) {
      setMessage("Error verifying OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const { name, contactNumber, email, password, role, course, year } = formData;

    if (!otpVerified) {
      setMessage("Please verify your email with OTP before registering.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    const data = new FormData();
    data.append("name", name);
    data.append("contactNumber", contactNumber);
    data.append("email", email);
    data.append("password", password);
    data.append("role", role);
    data.append("course", course);
    data.append("year", year);
    if (photo) data.append("photo", photo);

    try {
      const res = await fetch("https://du-alumni-connect.onrender.com/api/auth/register", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage(result.message || "Registration failed");
        return;
      }
      setMessage("Registration successful! Please log in.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div id="webcrumbs">
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl hover:shadow-blue-500 overflow-hidden animate-fade-in">
          <div className="bg-blue-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Create Account</h1>
            <p className="text-blue-100 text-lg">Join our community today</p>
          </div>

          <form className="p-8 md:p-12 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-lg">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-lg">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-lg">Email Address</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                  placeholder="test@gmail.com"
                  required
                  disabled={otpSent}
                />
                {!otpSent && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="bg-blue-500 text-white px-4 rounded-lg"
                  >
                    Verify
                  </button>
                )}
              </div>
              {otpSent && !otpVerified && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full h-14 px-4 border-2 border-blue-200 bg-gray-50 text-lg rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="bg-green-500 text-white px-4 rounded-lg"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
              {otpVerified && (
                <div className="text-green-600 mt-2">OTP Verified!</div>
              )}
            </div>

            <div className="bg-gray-50 p-6 border-l-4 border-blue-500 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Profile Photo</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-600 text-2xl">person</span>
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-semibold file:text-lg hover:file:bg-blue-700 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-lg">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                  placeholder="Create password"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-lg">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-lg">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                >
                  <option value="user">Student</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-lg">Course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                  required
                >
                  <option value="" disabled>Select Course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-lg">Year of Admission</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                placeholder="2024"
                required
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white h-16 text-xl font-bold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-3 rounded-lg shadow-lg"
              >
                <span>Register Account</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-600 text-lg">
                Already have an account?
                <a
                  href="/login"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors ml-2"
                >
                  Sign In
                </a>
              </p>
            </div>
            {message && (
              <div className="mt-6 text-center text-lg font-semibold text-blue-700">{message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;