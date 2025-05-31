const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://malayasahu2004:Malaya@cluster1.5gsuy.mongodb.net/"
);

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
