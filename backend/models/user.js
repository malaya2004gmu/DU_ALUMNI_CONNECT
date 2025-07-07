const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "alumni", "user"], default: "user" },
  contactNumber: String,
  photo: String,
  course:String,
  year:String,
  createdAt: { type: Date, default: Date.now },
 otp:String,
 otpExpiry:Date,
});

module.exports = mongoose.model("User", userSchema);
