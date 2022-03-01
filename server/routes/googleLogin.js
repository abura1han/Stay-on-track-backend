require("dotenv").config();

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

/**
 * Login controller
 * If user already have an account then login
 * If not then create an account
 */
const loginController = async (req, res, next) => {
  let { token } = req.body;
  try {
    if (!token) {
      return next({
        success: false,
        statusCode: 400,
        message: "Login field token is required",
      });
    }

    // Verify oAuth client token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    const userName = email.slice(0, -10);

    /**
     * New jwt access token
     */
    const stayToken = jwt.sign(
      {
        userName,
        name,
        email,
        picture,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60d" }
    );

    /**
     * Check is user exist
     */
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Login successful",
        data: {
          stayToken,
          userName,
          name,
          email,
          picture,
        },
      });
    }

    /**
     * If user does not exist then create
     */
    const user = await User.create({ avatar: picture, userName, name, email });
    await user.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User creation successful",
      data: {
        stayToken,
        userName,
        name,
        email,
        picture,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Server error occurred",
    });
  }
};

module.exports = loginController;
