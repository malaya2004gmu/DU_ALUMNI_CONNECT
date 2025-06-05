const mongoose =  require( "mongoose");
const jobPost =require("../models/jobPost");
const User = require("../models/user");
const Event =require("../models/events");
exports.getMyJobs =async (req,res)=>{
   
    try{
        //console.log( "user :",req.user);
        const userId= req.user._id;
        const jobs =await jobPost.find({postedBy:userId});
        res.status(200).json(jobs);
    }
    catch(err)
    {
        res.status(500).json({message:"server error while retieving jobs"});
    }
};
