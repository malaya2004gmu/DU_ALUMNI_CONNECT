import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const FinalCall = () => {
  const {user}=useAuth();
  return (
    <section className="py-10 bg-blue-800 text-white text-center">
      <h2 className="text-2xl font-bold mb-4">Start Connecting Today</h2>
      <p className="mb-6">
        Be a part of a growing network of DU alumni making a difference.
      </p>
      { !user &&
      <Link
        to="/register"
        className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-2 rounded-full transition"
      >
        Join Now
      </Link>
}
    </section>
  );
};

export default FinalCall;
