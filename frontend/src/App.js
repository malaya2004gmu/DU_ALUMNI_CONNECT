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
import Myjobs from "./pages/Alumni/MyJobs";
import MyProfile from "./pages/Alumni/MyProfile";
import AddCourse from "./pages/admin/mngcourse/AddCourse";
import DeleteCourse from "./pages/admin/mngcourse/DeleteCourse";
import AddEvent  from "./pages/admin/mngevent/AddEvent";
import DeleteEvent from "./pages/admin/mngevent/DeleteEvent";
import Events from "./pages/User/Events";
import PostedJobs from "./pages/User/PostedJobs";
import EventDetails  from "./pages/User/EventDetail";
import Footer from  "./components/Footer";
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
        <Route path="/alumni/my-jobs" element={<Myjobs />} />
        <Route path="/admin/add-course" element={<AddCourse/>}/>
        <Route path="/admin/delete-course" element={<DeleteCourse/>}/>
        <Route path="/admin/add-event" element ={<AddEvent/>}/>
        <Route path="/admin/delete-event" element ={<DeleteEvent/>}/>
        <Route path="/events" element={<Events />} />
        <Route path="/posted-jobs" element={<PostedJobs />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/footer" element={<Footer />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
