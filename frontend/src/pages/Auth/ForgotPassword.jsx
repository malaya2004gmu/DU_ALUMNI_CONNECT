import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify + reset
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const sendOtp = async () => {
    setMessage("");
    setError(false);
    try {
      const res = await fetch("https://du-alumni-connect.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("OTP sent to your email.");
        setStep(2);
      } else {
        setError(true);
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError(true);
      setMessage("Something went wrong.");
    }
  };

  const resetPassword = async () => {
    setMessage("");
    setError(false);
    try {
      const res = await fetch("https://du-alumni-connect.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successfully. Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(true);
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError(true);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl hover:shadow-blue-500 overflow-hidden animate-fade-in">
        <div className="bg-blue-600 p-8 text-white text-center">
          <h2 className="text-3xl font-bold">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>
          <p className="text-blue-100 mt-1">
            {step === 1
              ? "Enter your email to receive an OTP"
              : "Enter OTP and your new password"}
          </p>
        </div>

        <div className="p-8 space-y-5">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
              <button
                onClick={sendOtp}
                className="w-full h-12 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-14 px-4 border-2 border-gray-200 bg-gray-50 text-lg rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
              <button
                onClick={resetPassword}
                className="w-full h-12 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition-all shadow-md"
              >
                Reset Password
              </button>
            </>
          )}

          {message && (
            <div
              className={`text-center font-semibold ${
                error ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
