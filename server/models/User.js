const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * User model
 */
const userSchema = new Schema(
  {
    avatar: {
      type: String,
      default: "USER",
    },
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
