const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const adminDashboardRoutes = require("./routes/adminDashboard.route");
const alumniRoutes = require("./routes/alumni.route");
const addingDataRoutes = require("./routes/addingData.route");
const tokenRoute =require("./routes/token.route");
const path = require("path");
const http = require("http"); 
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io"); 
const ChatRoutes =require("./routes/chat.route");
const postRoutes=require("./routes/commpost.route")
const app = express();

const server = http.createServer(app); 
const limiter=require("./utils/limiter");

const corsMiddleware=require("./middleware/cors");
const socketHandlers=require("./utils/socketHandler");
require('dotenv').config();
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST","PUT", "DELETE"],
    credentials:true,
  },
});

app.use(cookieParser());
app.use(corsMiddleware);
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/add", addingDataRoutes);
app.use("/uploads", cors(), express.static(path.join(__dirname, "uploads")));
app.use("/api/chat",ChatRoutes);
app.use("/api/post",postRoutes);
app.use("/api/token",tokenRoute);
socketHandlers(io);

const PORT= process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server running on port 5000");
});
