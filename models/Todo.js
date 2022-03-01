const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  todo: {
    type: String,
    trim: true,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
