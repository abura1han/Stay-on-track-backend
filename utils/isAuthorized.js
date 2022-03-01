require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Verify user access token
 */
const isAuthorized = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Unauthorized access blocked",
      });
    }

    const user = jwt.verify(authorization, process.env.JWT_SECRET);

    // If user not exist
    const isUserExist = await User.findOne({ email: user.email });
    if (!isUserExist) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid token" });
    }

    req.User = isUserExist;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Stay token expired. Please login again",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid token" });
    }

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Server error occurred",
    });
  }
};

module.exports = isAuthorized;
