
const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  otpExpiry: Date,
});
module.exports = mongoose.model("Otp", otpSchema);