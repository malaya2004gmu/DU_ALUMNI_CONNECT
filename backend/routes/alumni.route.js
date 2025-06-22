
const express= require( 'express');
const { getMyJobs } = require( "../controllers/alumni.controller");
const router =express.Router();
const {verifyToken} = require("../middleware/auth");
const { deleteJob} = require("../controllers/alumni.controller");
const isAlumni = require("../middleware/isAlumni");
const isAdmin = require("../middleware/isAdmin");
router.get('/my-jobs',verifyToken,isAlumni, getMyJobs);
router.delete("/delete-job/:id",verifyToken,isAlumni,deleteJob);
module.exports =router;