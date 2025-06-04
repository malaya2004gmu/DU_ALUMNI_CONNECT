
const mongoose = require("mongoose");
const User = require("../models/user");
const JobPost = require("../models/jobPost");
const Event = require("../models/events");
const Course = require("../models/course");

exports.getAlumni = async (req, res) => {
  
  try {
    const alumni = await User.find({ role: "alumni" }).select("-password");
    res.status(200).json(alumni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while retriving user data" });
  }
};
exports.getJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find({})
      .populate("postedBy", "name email")
      .exec();
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

    res.status(200).json({
      alumniCount,
      jobPostCount,
      eventCount,
      courseCount,
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
    const approvedjobs = await JobPost.find({ status: approved });
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