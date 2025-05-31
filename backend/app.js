const express = require("express");
const cors = require("cors");
const app = express();
const 
app.use(cors());
app.use(express.json());

// Example Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use the auth routes


module.exports = app;