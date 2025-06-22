const express = require("express");
const router = express.Router();
const {
  addEvent,
  addCourse,
  addJobPost,
} = require("../controllers/addingData.controller");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/uploads");
const isAdmin = require("../middleware/isAdmin");
router.post("/event",upload.single("image"),verifyToken,isAdmin, addEvent);
router.post("/add-course",verifyToken, isAdmin, addCourse);
router.post("/job-post", verifyToken, isAdmin, addJobPost);

module.exports = router;
