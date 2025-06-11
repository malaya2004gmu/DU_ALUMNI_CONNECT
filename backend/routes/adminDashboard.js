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
} = require("../controllers/adminController");
// const {verifyToken} = require("../middleware/auth");
router.get("/alumni", getAlumni);
router.get("/job-posts", getJobPosts);
router.get("/approved-jobs", getApprovedJob);
router.get("/events",getEvents);
router.get("/event-details/:id", getEventDetails);
router.get("/courses",getCourses);
router.get("/stat", getStatistics);
router.get("/reports",getReports);
router.post("/add-course",addCourse);
router.delete("/delete-course/:id",deleteCourse);
router.delete("/delete-event/:id",deleteEvent);
router.delete("/delete-job/:id",deleteJob);
router.put("/approve-job/:id",setApproveJob);
router.put("/reject-job/:id",setRejectJob);
router.get("/alluser",allUser);
module.exports = router;
