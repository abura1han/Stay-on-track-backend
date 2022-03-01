const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
