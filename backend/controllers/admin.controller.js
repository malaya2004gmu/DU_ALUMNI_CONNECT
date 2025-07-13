const mongoose = require("mongoose");
const User = require("../models/user");
const JobPost = require("../models/jobPost");
const Event = require("../models/events");
const Course = require("../models/course");
const fs=require("fs");
const path=require('path');
exports.getAlumni = async (req, res) => {
  
  try {
    const alumni = await User.find({ role: "alumni" }).select("-password");
    res.status(200).json(alumni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while retriving user data" });
  }
};
exports.getStudents= async(req,res)=>{
  try {
    const students = await User.find({ role: "user" }).select("-password");
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while retrieving user data" });
  }
}
exports.getJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find({})
      .populate("postedBy", "name email");
    res.status(200).json(jobPosts);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while retrieving job posts" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).exec();
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while retrieving events" });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).exec();
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while retrieving courses" });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const alumniCount = await User.countDocuments({ role: "alumni" });
    const jobPostCount = await JobPost.countDocuments();
    const eventCount = await Event.countDocuments();
    const courseCount = await Course.countDocuments();
    const approvedJobCount =await JobPost.countDocuments({status:"approved"});
    const pendingJobCount =await JobPost.countDocuments({status:"rejected"});
    const studentCount = await User.countDocuments({ role: "user" });
    res.status(200).json({
      alumniCount,
      jobPostCount,
      eventCount,
      courseCount,
      approvedJobCount,
      pendingJobCount,
      studentCount,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while retrieving statistics" });
  }
};

exports.getApprovedJob = async (req, res) => {
  try {
    const approvedjobs = await JobPost.find({ status: "approved" }).populate("postedBy", "name email").exec();
    res.status(200).json(approvedjobs);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while retrieving  approved jobs" });
  }
};

exports.getPendingJob = async (req, res) => {
  try {
    const pendingjobs = await JobPost.find({ status: pending });

    return res.status(200).json(pendingjobs);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server error while retrieving  approved jobs" });
  }
};

exports.addCourse =async (req,res)=>{
  const { name, duration, description } = req.body;

  if (!name || !duration || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }
   const existingCourse =await Course.findOne({name});
  if (existingCourse) {
    return res.status(400).json({ error: "Course already exists" });
  }
  try {
    const newCourse = new Course({
      name,
      duration,
      description,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add course" });
  }
};

exports.deleteCourse =async(req,res)=>{

  try{
    const courseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  }
  catch(err)
  {
    res.status(500).json({ error: "Failed to delete course" });
  }
};

exports.deleteEvent =async(req,res)=>{
  try {
    const eventId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }
    const event=await Event.findById(eventId);
    if(!event) return res.status(404).json({message:"event not found"});

    if(event.photo)
    {
      const pathname=path.join(__dirname,'..',event.photo);
       fs.unlink(pathname,(err)=>{
        if(err){
          console.log("error in deleting event image");
        }
       
       })
    }
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
exports.getEventDetails =async(req,res)=>{
  const eventId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({ error: "Invalid event ID" });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve event details" });
  }
};

exports.setApproveJob=async(req,res)=>{
  const jobId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    console.log("invalid id");
    return res.status(400).json({ error: "Invalid job ID" });
  }

  try {
    const updatedJob = await JobPost.findByIdAndUpdate(
      jobId,
      { status: "approved" },
      { new: true }
    );
    if (!updatedJob) {
      console.log("job not found");
      return res.status(404).json({ error: "Job post not found" });
    }
    res.status(200).json({success:true, message: "Job post approved successfully", updatedJob });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to approve job post" });
  }
};

exports.setRejectJob=async(req,res)=>{
  const jobId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ error: "Invalid job ID" });
  }

  try {
    const updatedJob = await JobPost.findByIdAndUpdate(
      jobId,
      { status: "rejected" },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ error: "Job post not found" });
    }
    res.status(200).json({ success:true, message: "Job post rejected successfully", updatedJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reject job post" });
  }
};

exports.getReports=async(req,res)=>{
  const { role, fromDate, course, batchYear } = req.query;
  const query = {};

  if (role) {
    query.role = role;
  }
  if (fromDate) {
    query.createdAt = { $gte: new Date(fromDate) };
  }
  if (course) {
    query.course = course;
  }
  if (batchYear) {
    query.year = String(batchYear);
  }

  try {
    const reports = await User.find(query).select("-password").exec();
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while retrieving reports" });
  }
};

exports.deleteJob =async(req,res)=>{
  const jobId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ error: "Invalid job ID" });
  }

  try {
    const deletedJob = await JobPost.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.status(404).json({ error: "Job post not found" });
    }
    res.status(200).json({ message: "Job post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete job post" });
  }
};
exports.allUser =async(req,res)=>{

  try{
    const users = await User.find({role :{$ne:"admin"}}).select("-password");
    res.status(200).json(users);
  }
  catch(err)
  {
    res.status(500).json({message:"server error in finding all user"});
  }
}