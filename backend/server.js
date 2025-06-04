const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminDashboardRoutes = require("./routes/adminDashboard");
const alumniRoutes=require("./routes/alumni");
const addingDataRoutes = require("./routes/addingData");
const app = express();
const path = require("path");
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://malayasahu2004:Malaya@cluster1.5gsuy.mongodb.net/"
);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/add", addingDataRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
