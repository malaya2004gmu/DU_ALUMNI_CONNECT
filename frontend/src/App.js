import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/User/Home";
import Login from "./pages/Auth/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import ManageCourses from "./pages/admin/ManageCourse";
import ManageEvents from "./pages/admin/ManagaEvents";
import ManageJobs from "./pages/admin/ManageJob";
import ManageAlumni from "./pages/admin/ManageAlumni";
import PostJob from "./pages/Alumni/PostJob";
import MyProfile from "./pages/Alumni/MyProfile";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/courses" element={<ManageCourses />} />
        <Route path="/admin/events" element={<ManageEvents />} />
        <Route path="/admin/job-posts" element={<ManageJobs />} />
        <Route path="/admin/alumni" element={<ManageAlumni />} />
        <Route path="/alumni/post-job" element={<PostJob />} />
        <Route path="/alumni/profile" element={<MyProfile />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
