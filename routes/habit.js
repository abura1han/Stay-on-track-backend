const res = require("express/lib/response");
const Habit = require("../models/Habit");

/**
 * Get all habits
 */
const getAllHabits = async (req, res) => {
  const { _id } = req.User;
  try {
    const habits = await Habit.find({ createdBy: _id });
    res.status(200).json({ success: true, statusCode: 200, data: habits });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

/**
 * Add new habit
 */
const addhabit = async (req, res) => {
  const { _id } = req.User;
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Habit name is required to create a habit",
      });
    }

    //   Create the habit
    const habit = await Habit.create({
      createdBy: _id,
      name: String(name).trim(),
      days: Array(30).fill(false),
    });
    await habit.save();

    res.status(200).json({ success: true, statusCode: 200, data: habit });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

/**
 * Update habit
 */
const updateHabit = async (req, res) => {
  const { _id } = req.User;
  const { habitId } = req.query;
  const { name, days } = req.body;
  try {
    const isHabitExist = await Habit.findOne({ _id: habitId, createdBy: _id });
    if (!isHabitExist) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid habit id" });
    }

    const updateHabit = await Habit.findByIdAndUpdate(
      {
        _id: habitId,
        createdBy: _id,
      },
      {
        $set: {
          name: name,
          days: days,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Habit updated successfully",
      data: updateHabit,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

/**
 * Delete habit
 */
const deleteHabit = async (req, res) => {
  const { _id } = req.User;
  const { habitId } = req.query;
  try {
    if (!habitId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Habit id is required to delete a habit",
      });
    }

    const isHabitExist = await Habit.findOne({ _id: habitId, createdBy: _id });
    if (!isHabitExist) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid habit id" });
    }

    const deleteHabit = await Habit.findOneAndDelete({
      createdBy: _id,
      _id: habitId,
    });

    res.status(200).json({ success: true, statusCode: 200, data: deleteHabit });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

module.exports = { getAllHabits, addhabit, updateHabit, deleteHabit };
