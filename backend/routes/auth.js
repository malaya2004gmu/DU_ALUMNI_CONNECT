const express = require("express");
const router = express.Router();
const { login, handleRegister } = require("../controllers/authController");

router.post("/login", login);
router.post("/register", handleRegister);
module.exports = router;
