const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
    required: true,
  },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
