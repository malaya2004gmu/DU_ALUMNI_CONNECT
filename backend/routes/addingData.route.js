const express = require("express");
const router = express.Router();
const {
  addEvent,
  addCourse,
  addJobPost,
} = require("../controllers/addingData.controller");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/uploads");

router.post("/event",upload.single("image"), addEvent);
router.post("/add-course", addCourse);
router.post("/job-post", verifyToken, addJobPost);

module.exports = router;
