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
} = require("../controllers/adminController");
// const {verifyToken} = require("../middleware/auth");
router.get("/alumni", getAlumni);
router.get("/job-posts", getJobPosts);
router.get("/approved-jobs", getApprovedJob);
router.get("/events",getEvents);
router.get("/courses",getCourses);
router.get("/stat", getStatistics);
router.post("/add-course",addCourse);
router.delete("/delete-course/:id",deleteCourse);
module.exports = router;
