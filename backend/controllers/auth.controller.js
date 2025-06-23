const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Course=require("../models/course");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN, {
      expiresIn: "1h",
    });

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