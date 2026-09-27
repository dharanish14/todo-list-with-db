const Todo = require('../models/Todo');

// @desc    Get all todos with search, filtering & sorting
// @route   GET /api/todos
exports.getTodos = async (req, res) => {
  try {
    const { search, category, priority, completed, sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    if (completed !== undefined && completed !== 'all') {
      query.completed = completed === 'true';
    }

    const sortOptions = {};
    const sortOrder = order === 'asc' ? 1 : -1;
    sortOptions[sortBy] = sortOrder;

    const todos = await Todo.find(query).sort(sortOptions);
    const categories = await Todo.distinct('category');

    res.status(200).json({
      success: true,
      count: todos.length,
      categories: ['All', ...categories.filter(c => c !== 'All')],
      data: todos
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single todo by ID
// @route   GET /api/todos/:id
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
exports.createTodo = async (req, res) => {
  try {
    const { title, description, priority, category, dueDate, subtasks, tags } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a task title' });
    }

    const newTodo = await Todo.create({
      title: title.trim(),
      description: description || '',
      priority: priority || 'medium',
      category: category ? category.trim() : 'General',
      dueDate: dueDate || null,
      subtasks: subtasks || [],
      tags: tags || []
    });

    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Toggle todo completed status
// @route   PATCH /api/todos/:id/toggle
exports.toggleTodoComplete = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    todo.completed = !todo.completed;
    
    // If completing the task, option to mark all subtasks complete
    if (todo.completed && todo.subtasks.length > 0) {
      todo.subtasks.forEach(sub => sub.completed = true);
    }

    await todo.save();

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully', data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get dashboard productivity stats
// @route   GET /api/todos/stats
exports.getStats = async (req, res) => {
  try {
    const total = await Todo.countDocuments();
    const completed = await Todo.countDocuments({ completed: true });
    const pending = total - completed;

    const now = new Date();
    const overdue = await Todo.countDocuments({
      completed: false,
      dueDate: { $ne: null, $lt: now }
    });

    const urgentCount = await Todo.countDocuments({ priority: 'urgent', completed: false });
    const highCount = await Todo.countDocuments({ priority: 'high', completed: false });

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.status(200).json({
      success: true,
      data: {
        total,
        completed,
        pending,
        overdue,
        urgentCount,
        highCount,
        completionRate
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
