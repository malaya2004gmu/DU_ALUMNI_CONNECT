const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const {
  login,
  handleRegister,
  updateProfile,
} = require("../controllers/auth.controller");

const { verifyToken } = require("../middleware/auth");
router.post("/login", login);
router.post("/register", upload.single("photo"), handleRegister);
router.put("/profile", verifyToken, upload.single("photo"), updateProfile);
module.exports = router;
