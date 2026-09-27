const express = require('express');
const router = express.Router();
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodoComplete,
  deleteTodo,
  getStats
} = require('../controllers/todoController');

// Stats route must be placed before /:id route
router.get('/stats', getStats);

router.route('/')
  .get(getTodos)
  .post(createTodo);

router.route('/:id')
  .get(getTodoById)
  .put(updateTodo)
  .delete(deleteTodo);

router.patch('/:id/toggle', toggleTodoComplete);

module.exports = router;
