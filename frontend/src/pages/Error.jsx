import React from "react";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
    <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
    <a href="/" className="text-blue-500 underline">Go Home</a>
  </div>
);

export default NotFound;