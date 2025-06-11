const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminDashboardRoutes = require("./routes/adminDashboard");
const alumniRoutes = require("./routes/alumni");
const addingDataRoutes = require("./routes/addingData");
const path = require("path");
const http = require("http"); 
const { Server } = require("socket.io"); 
const ChatRoutes =require("./routes/chat");
const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());


mongoose.connect("mongodb+srv://malayasahu2004:Malaya@cluster1.5gsuy.mongodb.net/");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/add", addingDataRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/chat",ChatRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(5000, () => {
  console.log("Server running on port 5000");
});
