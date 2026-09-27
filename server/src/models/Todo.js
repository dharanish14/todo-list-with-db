const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { _id: true });

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [120, 'Title cannot exceed 120 characters']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  category: {
    type: String,
    default: 'General',
    trim: true
  },
  dueDate: {
    type: Date,
    default: null
  },
  subtasks: [SubtaskSchema],
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for fast searching & filtering
TodoSchema.index({ title: 'text', description: 'text', category: 1, completed: 1, priority: 1 });

module.exports = mongoose.model('Todo', TodoSchema);
