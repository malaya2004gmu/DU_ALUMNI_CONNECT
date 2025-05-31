// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
