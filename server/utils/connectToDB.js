require("dotenv").config();

const mongoose = require("mongoose");

/**
 * Database connection
 */
const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ldpb3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    console.info("Database connected");
  } catch (error) {
    if (error) {
      console.error(`Database connection error: ${error}`);
    }
  }
};

module.exports = connectToDB;
