import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1 = send otp, 2 = verify + reset
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const sendOtp = async () => {
    setMessage("");
    setError(false);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
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
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
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
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-blue-400 w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={sendOtp}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <button
              onClick={resetPassword}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Reset Password
            </button>
          </>
        )}

        {message && (
          <div className={`mt-4 font-bold text-center ${error ? "text-red-500" : "text-green-600"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
