
const express= require( 'express');
const { getMyJobs } = require( "../controllers/alumni.controller");
const router =express.Router();
const {verifyToken} = require("../middleware/auth");
const { getEvents ,deleteJob} = require("../controllers/alumni.controller");
router.get('/my-jobs',verifyToken, getMyJobs);
router.delete("/delete-job/:id",verifyToken,deleteJob);
module.exports =router;