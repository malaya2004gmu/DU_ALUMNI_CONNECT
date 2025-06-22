const express = require("express");
const router = express.Router();
const {
  getAlumni,
  getJobPosts,
  getEvents,
  getCourses,
  getStatistics,
  getApprovedJob,
  addCourse,deleteCourse,
  deleteEvent,
  getEventDetails,
  setApproveJob,
  setRejectJob,
  getReports,
  deleteJob,
  allUser,
  getStudents,
} = require("../controllers/admin.controller");
 const {verifyToken} = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
router.get("/alumni",verifyToken,isAdmin, getAlumni);
router.get("/job-posts",verifyToken, getJobPosts);
router.get("/approved-jobs",verifyToken, getApprovedJob);
router.get("/events",getEvents);
router.get("/event-details/:id", getEventDetails);
router.get("/courses",verifyToken,isAdmin,getCourses);
router.get("/stat",verifyToken,isAdmin, getStatistics);
router.get("/reports",verifyToken,isAdmin,getReports);
router.post("/add-course",verifyToken,isAdmin,addCourse);
router.delete("/delete-course/:id",verifyToken,isAdmin,deleteCourse);
router.delete("/delete-event/:id",verifyToken,isAdmin,deleteEvent);
router.delete("/delete-job/:id",verifyToken,isAdmin,deleteJob);
router.put("/approve-job/:id",verifyToken,isAdmin,setApproveJob);
router.put("/reject-job/:id",verifyToken,isAdmin,setRejectJob);
router.get("/students",verifyToken,isAdmin,getStudents);
router.get("/alluser",verifyToken,allUser);
module.exports = router;
