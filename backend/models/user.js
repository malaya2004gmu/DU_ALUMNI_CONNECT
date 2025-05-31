// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["admin", "alumni", "user"], default: "user" },
//   name: { type: String },
// });

// module.exports = mongoose.model("User", userSchema);
// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "alumni", "user"], default: "user" },
  contactNumber: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
