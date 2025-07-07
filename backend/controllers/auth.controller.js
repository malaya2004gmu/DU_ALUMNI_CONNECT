const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Course=require("../models/course");
const crypto=require("crypto");
const nodemailer=require("nodemailer");
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    //  const refreshToken = jwt.sign(
    //   { id: user._id, role: user.role },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: "7d" }
    // );
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });
    
    await user.save();
    res.json({
      token,
      user: {
        _id:user._id,
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        contactNumber: user.contactNumber,
        photo: user.photo,
        year: user.year,
        course:user.course,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.handleRegister = async (req, res) => {
  const { name, contactNumber, email, password, role,year,course } = req.body;
  const photo = req.file ? req.file.path : null;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      contactNumber,
      email,
      password: hashedPassword,
      role,
      photo,
      year,
      course,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateProfile = async (req, res) => {
  console.log("updating .. profile");
  try {
    const userId = req.user.id;
    const { name, contactNumber } = req.body; // <-- fixed typo here
    let updateFields = { name, contactNumber }; // <-- define updateFields

    if (req.file) {
      updateFields.photo = req.file.path.replace(/\\/g, "/");
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({
      message: "profile updated successfully",
      user: {
        id: updateUser._id,
        email: updateUser.email,
        role: updateUser.role,
        name: updateUser.name,
        contactNumber: updateUser.contactNumber,
        photo: updateUser.photo,
        course: updateUser.course,
        year: updateUser.year,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.courses = async (req, res) => {
  try {
    const courses = await Course.find().select("name"); // Only select the 'name' field
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.sendOtp=async(req,res)=>{
  const {email}=req.body;

  const user=await User.findOne({email});
  if(!user)return res.status(404).json({message:"user not found"});
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 mins
  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, 
      pass: process.env.MAIL_PASS, 
    },
  });
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset OTP - DU Alumni Connect",
    text: `Your OTP for password reset is ${otp}`,
  });

  res.json({ message: "OTP sent to your email" });

}
exports.verifyOtpAndReset = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (
    !user ||
    user.otp !== otp ||
    !user.otpExpiry ||
    user.otpExpiry < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.json({ message: "Password reset successful login Now" });
};
