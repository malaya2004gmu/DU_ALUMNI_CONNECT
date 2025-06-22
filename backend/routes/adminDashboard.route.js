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
} = require("../controllers/admin.controller");
 const {verifyToken} = require("../middleware/auth");
router.get("/alumni",verifyToken, getAlumni);
router.get("/job-posts",verifyToken, getJobPosts);
router.get("/approved-jobs",verifyToken, getApprovedJob);
router.get("/events",getEvents);
router.get("/event-details/:id", getEventDetails);
router.get("/courses",verifyToken,getCourses);
router.get("/stat",verifyToken, getStatistics);
router.get("/reports",verifyToken,getReports);
router.post("/add-course",verifyToken,addCourse);
router.delete("/delete-course/:id",verifyToken,deleteCourse);
router.delete("/delete-event/:id",verifyToken,deleteEvent);
router.delete("/delete-job/:id",verifyToken,deleteJob);
router.put("/approve-job/:id",verifyToken,setApproveJob);
router.put("/reject-job/:id",verifyToken,setRejectJob);
router.get("/alluser",verifyToken,allUser);
module.exports = router;
