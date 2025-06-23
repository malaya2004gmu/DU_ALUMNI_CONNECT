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
const isAlumni = require("../middleware/isAlumni");
router.post("/event",upload.single("image"),verifyToken,isAdmin, addEvent);
router.post("/add-course",verifyToken, isAdmin, addCourse);
router.post("/job-post", verifyToken, isAlumni, addJobPost);

module.exports = router;
