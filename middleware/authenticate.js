const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == null)
    return res.status(401).json({ message: "Please login " });

  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = user; 
    next();
  });
};
