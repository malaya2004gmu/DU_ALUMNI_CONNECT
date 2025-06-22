module.exports = (req, res, next) => {
  if (req.user && req.user.role === "alumni") {
    return next();
  }
  return res.status(403).json({ error: "Access denied. Alumni only." });
};