const mongoose = require("mongoose");
const User = require("../models/user");
const JobPost = require("../models/jobPost");
const Event = require("../models/events");
const Course = require("../models/course");
//const { validationResult } = require("express-validator");

exports.addEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const photo= req.file? req.file.path.replace(/\\/g,"/") :null;
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      photo,
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event added successfully", event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding event" });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { name, description, duration } = req.body;
    const newCourse = new Course({
      name,
      description,
      duration,
    });
    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding course" });
  }
};

exports.addJobPost = async (req, res) => {

  try {
    const { title, description, company, location, salary ,applyLink} = req.body;
    const newJobPost = new JobPost({
      title,
      description,
      company,
      location,
      salary,
      postedBy: req.user._id, 
      applyLink,// Assuming req.user is set by authentication middleware
    });
    await newJobPost.save();
    res
      .status(201)
      .json({ message: "Job post added successfully", jobPost: newJobPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding job post" });
  }
};
