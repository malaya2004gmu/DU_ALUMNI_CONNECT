const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/auth.route");
const adminDashboardRoutes = require("./routes/adminDashboard.route");
const alumniRoutes = require("./routes/alumni.route");
const addingDataRoutes = require("./routes/addingData.route");
const tokenRoute = require("./routes/token.route");
const ChatRoutes = require("./routes/chat.route");
const postRoutes = require("./routes/commpost.route");

const corsMiddleware = require("./middleware/cors");

const app = express();

app.use(cookieParser());
app.use(corsMiddleware);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/add", addingDataRoutes);
app.use("/uploads", cors(), express.static(path.join(__dirname, "uploads")));
app.use("/api/chat", ChatRoutes);
app.use("/api/post", postRoutes);
app.use("/api/token", tokenRoute);

module.exports = app;