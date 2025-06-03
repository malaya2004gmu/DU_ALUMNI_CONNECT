// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, "MalayaDu2004"); // replace with env
    req.user = await User.findById(verified.id).select("-password");
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
