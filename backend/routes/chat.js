const express = require("express");

const router = express.Router();
const {getMessage,postMessage} =require ("../controllers/chatController");

router.post("/message", postMessage);
router.get("/history", getMessage);

module.exports = router;
