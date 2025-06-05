import React from "react";

const DashboardCard = ({ title, count, color, icon, onViewDetails }) => {
  return (
    <div className={`rounded-xl shadow-sm p-4 ${color} text-white hover:shadow-md transition`}>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="mt-4 text-3xl font-bold">{count}</div>
      <button
        onClick={onViewDetails}
        className="mt-4 inline-block text-sm bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
      >
        View Details
      </button>
    </div>
  );
};

export default DashboardCard;
