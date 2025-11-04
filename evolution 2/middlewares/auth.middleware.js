const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: "Invalid user" });

    req.user = { userId: user._id, email: user.email };
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
