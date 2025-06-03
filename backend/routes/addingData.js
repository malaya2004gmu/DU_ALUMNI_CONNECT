const express = require("express");
const router = express.Router();
const {
  addEvent,
  addCourse,
  addJobPost,
} = require("../controllers/addingDataController");
const { verifyToken } = require("../middleware/auth");

router.post("/add-event", addEvent);
router.post("/add-course", addCourse);
router.post("/job-post", verifyToken, addJobPost);

module.exports = router;
