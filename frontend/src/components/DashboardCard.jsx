import React from "react";

const colorMap = {
  purple: "bg-purple-600",
  orange: "bg-orange-500",
  teal: "bg-teal-500",
  red: "bg-red-500",
};

const DashboardCard = ({ title, count, color, icon, onViewDetails }) => (
  <div
    className={`rounded-xl shadow-lg p-8 flex flex-col items-center min-h-[180px] ${
      colorMap[color] || "bg-gray-200"
    } text-white`}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <div className="text-3xl font-bold mb-2">{count}</div>
    <div className="text-lg font-semibold">{title}</div>
    <button
      className="mt-auto bg-white text-blue-700 font-semibold px-4 py-2 rounded hover:bg-blue-100 transition"
      onClick={onViewDetails}
    >
      View Details
    </button>
  </div>
);

export default DashboardCard;
