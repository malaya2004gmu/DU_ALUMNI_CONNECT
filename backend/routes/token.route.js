const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router(); 

// Refresh Token Route
router.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken; 

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ token: newAccessToken });
  });
});

module.exports = router;
