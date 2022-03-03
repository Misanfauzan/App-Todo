const express = require('express');

const router = express.Router();

// Controller
const { updateTodo, getTodos, getTodo, deleteTodo, addTodo, updateIsDone, getTodoIsDone } = require('../controllers/todo');

// Route
router.post('/todo', addTodo);
router.get("/todo/:id",  getTodo);
router.get('/todos', getTodos);
router.patch('/todo/:id', updateTodo);
router.get('/todo-isdone', getTodoIsDone);
router.patch('/todo-isdone', updateIsDone);
router.delete('/todo', deleteTodo);

module.exports = router;