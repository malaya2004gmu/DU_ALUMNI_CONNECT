import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/User/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import ManageCourses from "./pages/admin/ManageCourse";
import ManageEvents from "./pages/admin/ManagaEvents";
import ManageJobs from "./pages/admin/ManageJob";
import ManageAlumni from "./pages/admin/ManageAlumni";
import ManageStudents from "./pages/admin/ManageStudents";
import PostJob from "./pages/Alumni/PostJob";
import Myjobs from "./pages/Alumni/MyJobs";
import MyProfile from "./pages/Alumni/MyProfile";
import AddCourse from "./pages/admin/mngcourse/AddCourse";
import DeleteCourse from "./pages/admin/mngcourse/DeleteCourse";
import AddEvent from "./pages/admin/mngevent/AddEvent";
import DeleteEvent from "./pages/admin/mngevent/DeleteEvent";
import Events from "./pages/User/Events";
import PostedJobs from "./pages/User/PostedJobs";
import EventDetails from "./pages/User/EventDetail";
import Reports from "./pages/admin/ManageReport";
import ApprovedJobs from "./pages/admin/mngjob/ApprovedJob";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import RejectedJobs from "./pages/admin/mngjob/RejectedJobs";
import DeleteJob from "./pages/admin/mngjob/DeleteJob";
import ChatPage from "./pages/Chat/ChatPage";
import { ChatProvider } from "./context/ChatContext";
import {useAuth} from "./context/AuthContext";
import NotFound from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const {user}=useAuth();
  return (
    <BrowserRouter>
      <ChatProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={["admin"]}><ManageCourses /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute allowedRoles={["admin"]}><ManageEvents /></ProtectedRoute>} />
            <Route path="/admin/job-posts" element={<ProtectedRoute allowedRoles={["admin"]}><ManageJobs /></ProtectedRoute>} />
            <Route path="/admin/alumni" element={<ProtectedRoute allowedRoles={["admin"]}><ManageAlumni /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["admin"]}><ManageStudents /></ProtectedRoute>} />
            <Route path="/admin/add-course" element={<ProtectedRoute allowedRoles={["admin"]}><AddCourse /></ProtectedRoute>} />
            <Route path="/admin/delete-course" element={<ProtectedRoute allowedRoles={["admin"]}><DeleteCourse /></ProtectedRoute>} />
            <Route path="/admin/add-event" element={<ProtectedRoute allowedRoles={["admin"]}><AddEvent /></ProtectedRoute>} />
            <Route path="/admin/delete-event" element={<ProtectedRoute allowedRoles={["admin"]}><DeleteEvent /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={["admin"]}><Reports /></ProtectedRoute>} />
            <Route path="/events" element={<Events />} />
            <Route path="/posted-jobs" element={<PostedJobs />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/admin/approved-jobs" element={<ApprovedJobs />} />
            <Route path="/admin/rejected-jobs" element={<ProtectedRoute allowedRoles={["admin"]}><RejectedJobs /></ProtectedRoute>} />
            <Route path="/admin/delete-job" element={<ProtectedRoute allowedRoles={["admin"]}><DeleteJob /></ProtectedRoute>} />
            <Route path="/alumni/post-job" element={<ProtectedRoute allowedRoles={["alumni"]}><PostJob /></ProtectedRoute>} />
            <Route path="/alumni/profile" element={<ProtectedRoute allowedRoles={["alumni","user"]}><MyProfile /></ProtectedRoute>} />
            <Route path="/alumni/my-jobs" element={<ProtectedRoute allowedRoles={["alumni"]}><Myjobs /></ProtectedRoute>} />
            {/* Add your chat route here, with real user IDs or from context */}
            <Route path="/chat" element={user?<ChatPage currentUserId={user._id} />:<Login/>} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Layout>
      </ChatProvider>
      
    </BrowserRouter>
  );
}

export default App;