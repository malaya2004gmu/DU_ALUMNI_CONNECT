import React from "react";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="shadow p-6 rounded-lg bg-gray-50 text-center hover:shadow-md transition">
      <h3 className=" text-blue-600 text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;