const router = require("express").Router();
const loginController = require("./googleLogin");
const isAuthorized = require("../utils/isAuthorized");
const checkAuthorization = require("./checkAuthorization");
const {
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  addNote,
} = require("./note");
const { getAllUrls, deleteUrl, updateUrl, addUrl } = require("./url");
const {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("./todo");
const { getAllHabits, addhabit, updateHabit, deleteHabit } = require("./habit");

// Login route
router.post("/google-login", loginController);

// Protected routes
router.use(isAuthorized);

// Check authorization
router.all("/check-authorization", checkAuthorization);

// Note routes
router.get("/notes", getAllNotes); // Get all notes
router.get("/note/:nodeId", getNoteById); // Get note by id
router.post("/add-note", addNote); // Add new note
router.patch("/update-note", updateNote); // Update note
router.delete("/delete-note", deleteNote); // Delete note

// URLs routes
router.get("/urls", getAllUrls); // Get all urls
router.get("/url/:nodeId", getNoteById); // Get url by id
router.post("/add-url", addUrl); // Add new url
router.patch("/update-url", updateUrl); // Update url
router.delete("/delete-url", deleteUrl); // Delete url

// Todo routes
router.get("/todos", getAllTodos); // Get all todos
router.get("/todo/:todoId", getTodoById); // Get todo by id
router.post("/add-todo", addTodo); // Add todo
router.patch("/update-todo", updateTodo); // Update todo
router.delete("/delete-todo", deleteTodo); // Delete todo

// Habit routes
router.get("/habits", getAllHabits); // Get all habits
// router.get("/habit/:habitId"); // Get habit by id
router.post("/add-habit", addhabit); // Add new habit
router.patch("/update-habit", updateHabit); // Update habit
router.delete("/delete-habit", deleteHabit); // Delete habit

module.exports = router;
