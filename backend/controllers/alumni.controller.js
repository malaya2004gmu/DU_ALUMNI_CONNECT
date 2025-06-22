const mongoose =  require( "mongoose");
const jobPost =require("../models/jobPost");

exports.getMyJobs =async (req,res)=>{
   
    try{
        const userId= req.user._id;
        const jobs =await jobPost.find({postedBy:userId});
        res.status(200).json(jobs);
    }
    catch(err)
    {
        res.status(500).json({message:"server error while retieving jobs"});
    }
};

exports.deleteJob= async (req,res)=> {
  
    try{
        const jobid=req.params.id;

        const delJob=await jobPost.findByIdAndDelete(jobid);
        if(!delJob)
        {
            res.status(400).json({error:"job not found"});
        }
        res.status(200).json({message:"job deleted"});
    }
    catch(err)
    {
        res.status(400).json({error:"server issue in deleting job"});
    }
    
}