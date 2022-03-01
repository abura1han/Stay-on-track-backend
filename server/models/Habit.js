const mongoose = require("mongoose");
const { Schema } = mongoose;

const habitSchema = new Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  days: [
    {
      type: Boolean,
      required: true,
      default: false,
    },
  ],
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
