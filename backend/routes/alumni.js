
const express= require( 'express');
const { getMyJobs } = require( "../controllers/alumniController");
const router =express.Router();
const {verifyToken} = require("../middleware/auth");
router.get('/my-jobs',verifyToken, getMyJobs);

module.exports =router;