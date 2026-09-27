import React, { useState, useEffect } from 'react';
import { X, Plus, Trash, Calendar, Tag, AlertCircle } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setPriority(taskToEdit.priority || 'medium');
      setCategory(taskToEdit.category || 'General');
      setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '');
      setSubtasks(taskToEdit.subtasks || []);
      setTags(taskToEdit.tags || []);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('General');
      setDueDate('');
      setSubtasks([]);
      setTags([]);
    }
    setError('');
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddSubtask = () => {
    if (!newSubtaskText.trim()) return;
    setSubtasks([...subtasks, { text: newSubtaskText.trim(), completed: false }]);
    setNewSubtaskText('');
  };

  const handleRemoveSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = tagInput.trim().replace(/^#/, '');
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a task title');
      return;
    }

    onSave({
      _id: taskToEdit ? taskToEdit._id : undefined,
      title: title.trim(),
      description: description.trim(),
      priority,
      category: category.trim() || 'General',
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      subtasks,
      tags
    });

    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '1.75rem',
        borderRadius: 'var(--radius-lg)',
        position: 'relative'
      }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
            {taskToEdit ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onClose} className="glass-button" style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#f87171',
            padding: '0.6rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Task Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Prepare MongoDB Atlas Deployment Specs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-glass)',
                background: 'var(--bg-glass)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Add extra context or instructions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-glass)',
                background: 'var(--bg-glass)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Grid: Category, Priority & Due Date */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            
            {/* Category */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Work, Personal"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Priority */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent 🔥</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

          </div>

          {/* Subtasks Builder */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Subtasks Checklist
            </label>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                placeholder="Add step or subtask item..."
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubtask())}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-glass)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button type="button" onClick={handleAddSubtask} className="glass-button" style={{ padding: '0.5rem 0.8rem' }}>
                <Plus size={16} />
              </button>
            </div>

            {subtasks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '120px', overflowY: 'auto' }}>
                {subtasks.map((sub, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--bg-glass)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem'
                  }}>
                    <span>{sub.text}</span>
                    <button type="button" onClick={() => handleRemoveSubtask(i)} style={{ border: 'none', background: 'transparent', color: 'var(--accent-rose)', cursor: 'pointer' }}>
                      <Trash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags Input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Tags (Press Enter or comma to add)
            </label>
            <input
              type="text"
              placeholder="e.g. docker, atlas, setup"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-glass)',
                background: 'var(--bg-glass)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />

            {tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {tags.map((t, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.75rem',
                    background: 'rgba(139, 92, 246, 0.15)',
                    color: 'var(--accent-violet)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    #{t}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveTag(t)} />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} className="glass-button">
              Cancel
            </button>
            <button type="submit" className="glass-button btn-primary">
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
