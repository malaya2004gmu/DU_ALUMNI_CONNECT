// models/JobPost.js
const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location:String,
  salary:String,
  applyLink: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobPost", jobPostSchema);
