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
    totalEvents: 0,
    totalCourses: 0,
    newJobs: 0,
    approvedJobs: 0,
    rejectedJobs: 0,
    totalJobs: 0,
    totalAlumni: 0,
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <DashboardCard
            title="Total Events"
            count={data.totalEvents}
            color="purple"
            icon={<FaClipboardList />}
            onViewDetails={() => {}}
          />
          <DashboardCard
            title="Total Course"
            count={data.totalCourses}
            color="orange"
            icon={<FaBook />}
          />
          <DashboardCard
            title="New Job Post Request"
            count={data.newJobs}
            color="orange"
            icon={<FaClipboardList />}
          />
          <DashboardCard
            title="Approved Job Post"
            count={data.approvedJobs}
            color="teal"
            icon={<FaCheck />}
          />
          <DashboardCard
            title="Canceled / Rejected Job Post"
            count={data.rejectedJobs}
            color="red"
            icon={<FaTimes />}
          />
          <DashboardCard
            title="Total Job Request"
            count={data.totalJobs}
            color="purple"
            icon={<FaClipboardList />}
          />
          <DashboardCard
            title="Total Alumni Reg"
            count={data.totalAlumni}
            color="orange"
            icon={<FaUsers />}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
