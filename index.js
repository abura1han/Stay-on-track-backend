require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 8000 || process.env.PORT;
const cors = require("cors");
const helmet = require("helmet");
const connectToDB = require("./utils/connectToDB");
const router = require("./routes");
const logger = require("morgan");

/**
 * Database connection
 */
connectToDB();

/**
 * Middlewares
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logger("dev"));

/**
 * Routers
 */
app.use("/api", router);

/**
 * Error handling
 */
app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(err.statusCode).send(err.message);
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
