const express = require("express");
const router = express.Router();
const {getMessage,postMessage} =require ("../controllers/chat.controller");
const {verifyToken} = require("../middleware/auth");
router.post("/message", verifyToken, postMessage);
router.get("/history", verifyToken, getMessage);

module.exports = router;
