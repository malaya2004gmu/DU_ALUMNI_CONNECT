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
      localStorage.setItem("privateKey",data.user?.privateKey);
        localStorage.setItem("publicKey",data.user?.publicKey);

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
    <div id="webcrumbs">
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-md rounded-lg shadow-2xl hover:shadow-blue-500 overflow-hidden animate-fade-in">
          <div className="bg-blue-600 p-8 text-white text-center">
            <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
            <p className="text-blue-100 text-lg">Login to continue</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-10 space-y-6"
            autoComplete="on"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-semibold text-gray-800 text-lg"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 font-semibold text-gray-800 text-lg"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white h-14 text-lg font-bold hover:bg-blue-700 transition-all transform hover:scale-105 rounded-lg shadow-md"
            >
              Login
            </button>

            <div className="text-center pt-2">
              <p className="text-sm text-blue-600">
                <Link to="/forgot-password" className="hover:underline">
                  Forgot Password?
                </Link>
              </p>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-600 text-md">
                Don’t have an account?
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:text-blue-700 ml-2 transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
