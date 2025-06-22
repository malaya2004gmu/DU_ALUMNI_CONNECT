const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const adminDashboardRoutes = require("./routes/adminDashboard.route");
const alumniRoutes = require("./routes/alumni.route");
const addingDataRoutes = require("./routes/addingData.route");
const path = require("path");
const http = require("http"); 
const { Server } = require("socket.io"); 
const ChatRoutes =require("./routes/chat.route");
const app = express();
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const server = http.createServer(app); 
const limiter=require("./utils/limiter");
const helmet =require('helmet');
const corsMiddleware=require("./middleware/cors");
const socketHandlers=require("./utils/socketHandler");
require('dotenv').config();
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
app.use(limiter);
app.use(mongoSanitize());//prevent nosql injection
app.use(xss());//prevent xss attacks
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/add", addingDataRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/chat",ChatRoutes);

socketHandlers(io);


server.listen(5000, () => {
  console.log("Server running on port 5000");
});
