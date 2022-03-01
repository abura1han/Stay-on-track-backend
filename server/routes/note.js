const Note = require("../models/Note");

// Get all notes
const getAllNotes = async (req, res) => {
  const { _id } = req.User;
  try {
    const notes = await Note.find({ createdBy: _id });
    res.status(200).json({ success: true, statusCode: 200, data: notes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

// Get note by id
const getNoteById = async (req, res) => {
  const noteId = req.params.nodeId;
  const { _id } = req.User;
  try {
    const note = await Note.findOne({ createdBy: _id, _id: noteId });
    if (!note) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid note id" });
    }

    res.status(200).json({ success: true, statusCode: 200, data: node });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

// Create a note
const addNote = async (req, res) => {
  const { note } = req.body;
  const { _id } = req.User;
  try {
    if (!note) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Note is required to create a note",
      });
    }
    const newNote = await Note.create({
      createdBy: _id,
      note: note,
    });
    await newNote.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Note added successfully",
      data: newNote,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

// Update a note
const updateNote = async (req, res) => {
  const { noteId } = req.query;
  const { _id } = req.User;
  const { note } = req.body;
  try {
    if (!note) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Empty note can note be update",
      });
    }

    // Find the note
    const isNoteExist = Note.findOne({ _id: noteId, createdBy: _id });
    if (!isNoteExist) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid note id" });
    }

    // Update the note
    const updateNote = await Note.findOneAndUpdate(
      { _id: noteId, createdBy: _id },
      { $set: { note } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Note updated successfully",
      data: updateNote,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const { noteId } = req.query;
  const { _id } = req.User;
  try {
    // Find the note
    const note = Note.findOne({ _id: noteId, createdBy: _id });
    if (!note) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid note id" });
    }

    // Delete note
    const deleteNote = await Note.findOneAndDelete({
      _id: noteId,
      createdBy: _id,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Note deleted successfully",
      data: deleteNote,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  addNote,
  updateNote,
  deleteNote,
};
