import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaClipboardList,
  FaBook,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    eventCount: 0,
    courseCount: 0,
    approvedJobCount: 0,
    pendingJobCount: 0,
    jobPostCount: 0,
    alumniCount: 0,
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch("https://du-alumni-connect.onrender.com/api/admin/stat")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 bg-gray-50 animate-fade-in">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Total Events"
            count={data.eventCount || 0}
            color="bg-purple-600"
            icon={<FaClipboardList />}
            onViewDetails={() => navigate("/admin/events")}
          />
          <DashboardCard
            title="Total Courses"
            count={data.courseCount || 0}
            color="bg-orange-500"
            icon={<FaBook />}
            onViewDetails={() => navigate("/admin/courses")}
          />
          <DashboardCard
            title="Approved Jobs"
            count={data.approvedJobCount || 0}
            color="bg-teal-600"
            icon={<FaCheck />}
            onViewDetails={() => navigate("/admin/jobposts")}
          />
          <DashboardCard
            title="Rejected Jobs"
            count={(data.jobPostCount - data.approvedJobCount) || 0}
            color="bg-red-600"
            icon={<FaTimes />}
            onViewDetails={() => navigate("/admin/jobposts")}
          />
          <DashboardCard
            title="Total Job Posts"
            count={data.jobPostCount || 0}
            color="bg-indigo-600"
            icon={<FaClipboardList />}
            onViewDetails={() => navigate("/admin/jobposts")}
          />
          <DashboardCard
            title="Total Alumni"
            count={data.alumniCount || 0}
            color="bg-yellow-600"
            icon={<FaUsers />}
            onViewDetails={() => navigate("/admin/alumni")}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
