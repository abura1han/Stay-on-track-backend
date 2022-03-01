const Todo = require("../models/Todo");

/**
 * Get all todos
 */
const getAllTodos = async (req, res) => {
  const { _id } = req.User;
  const { limit } = req.query;
  try {
    const todos = await Todo.find({ createdBy: _id }).limit(limit);
    res.status(200).json({ success: true, statusCode: 200, data: todos });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

/**
 * Get single todo by id
 */
const getTodoById = async (req, res) => {
  const { todoId } = req.body;
  const { _id } = req.User;
  try {
    if (!todoId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Todo id is required",
      });
    }

    const todo = await Todo.findOne({ createdBy: _id, _id: todoId });
    // If todo not found
    if (!todo) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid todo id",
      });
    }

    res.status(200).json({ success: true, statusCode: 200, data: todo });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

/**
 * Add new todo
 */
const addTodo = async (req, res) => {
  const { _id } = req.User;
  const { todo } = req.body;
  try {
    if (!todo) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Todo is requied to create a todo",
      });
    }

    // Create new todo
    const newTodo = await Todo.create({ createdBy: _id, todo: todo });
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

/**
 * Update a todo
 */
const updateTodo = async (req, res) => {
  const { _id } = req.User;
  const { todoId } = req.query;
  const { todo, completed } = req.body;

  try {
    if (!todoId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Todo id is required to update a todo",
      });
    }

    const isTodoExist = await Todo.findOne({ createdBy: _id, _id: todoId });
    if (!isTodoExist) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid todo id" });
    }

    const updateTodo = await Todo.findOneAndUpdate(
      { createdBy: _id, _id: todoId },
      { $set: { ...req.body } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Todo updated successfully",
      data: updateTodo,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

/**
 * Delete todo
 */
const deleteTodo = async (req, res) => {
  const { _id } = req.User;
  const { todoId } = req.query;

  try {
    if (!todoId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Todo id is required to delete a todo",
      });
    }

    const isTodoExist = await Todo.findOne({ createdBy: _id, _id: todoId });
    if (!isTodoExist) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid todo id" });
    }

    const deleteTodo = await Todo.findOneAndDelete({
      createdBy: _id,
      _id: todoId,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Todo deleted successfully",
      data: deleteTodo,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
};
