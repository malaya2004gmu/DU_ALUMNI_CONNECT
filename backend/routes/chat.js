const express = require("express");

const router = express.Router();
import {getMessage,postMessage} from "../controllers/chatController";

router.post("/message", postMessage);
// GET: Fetch message history
router.get("/history", getMessage);

module.exports = router;
