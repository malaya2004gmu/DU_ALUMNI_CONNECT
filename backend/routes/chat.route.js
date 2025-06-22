const express = require("express");
const router = express.Router();
const {getMessage,postMessage} =require ("../controllers/chat.controller");

router.post("/message", postMessage);
router.get("/history", getMessage);

module.exports = router;
