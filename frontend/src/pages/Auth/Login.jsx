import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://du-alumni-connect.onrender.com/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      login(data.user);

      const role = data.user.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in hover:shadow-blue-500"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Welcome Back
        </h2>

        <div className="mb-5">
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold tracking-wide"
        >
          Login
        </button>
        <p className="mt-3 text-sm text-center text-blue-600">
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </p>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
