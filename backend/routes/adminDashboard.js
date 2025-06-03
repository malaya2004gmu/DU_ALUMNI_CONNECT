const express = require("express");
const router = express.Router();
const {
  getAlumni,
  getJobPosts,
  getEvents,
  getCourses,
  getStatistics,
  getApprovedJob,
} = require("../controllers/adminController");

router.get("/alumni", getAlumni);
router.get("/job-posts", getJobPosts);
router.get("/approved-jobs", getApprovedJob);
router.get("/events", getEvents);
router.get("/courses", getCourses);
router.get("/stat", getStatistics);
module.exports = router;
