import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Check, Sparkles, Loader2, Database } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);

  // Fetch tasks from MongoDB backend
  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/todos`);
      if (res.ok) {
        const data = await res.json();
        setTodos(data.data || []);
        setDbConnected(true);
      }
    } catch (err) {
      console.warn('Backend connecting...', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Add new task
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTaskText = text.trim();
    setText('');

    // Optimistic UI update
    const tempId = Date.now().toString();
    const tempTodo = { _id: tempId, title: newTaskText, completed: false };
    setTodos(prev => [tempTodo, ...prev]);

    try {
      const res = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskText })
      });

      if (res.ok) {
        fetchTodos();
      }
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  // Toggle completion (Tick)
  const handleToggle = async (id) => {
    setTodos(prev => prev.map(t => t._id === id ? { ...t, completed: !t.completed } : t));

    try {
      const res = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, { method: 'PATCH' });
      if (res.ok) {
        fetchTodos();
      }
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    setTodos(prev => prev.filter(t => t._id !== id));

    try {
      const res = await fetch(`${API_BASE_URL}/todos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTodos();
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '3rem 1rem'
    }}>
      
      {/* App Container */}
      <div style={{
        width: '100%',
        maxWidth: '520px',
        background: 'var(--grad-card)',
        backdropFilter: 'blur(20px)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-glass)',
        boxShadow: 'var(--shadow-glass)',
        padding: '2rem'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }} className="gradient-text">
              To-Do List
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {todos.length === 0 ? 'No tasks yet' : `${completedCount} of ${todos.length} done`}
            </p>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            background: dbConnected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
            border: `1px solid ${dbConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
            fontSize: '0.75rem',
            color: dbConnected ? '#34d399' : '#fbbf24',
            fontWeight: 600
          }}>
            <Database size={12} />
            <span>{dbConnected ? 'MongoDB Connected' : 'Connecting...'}</span>
          </div>
        </div>

        {/* Simple Add Input Form */}
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Add a new todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-glass)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          <button
            type="submit"
            className="glass-button btn-primary"
            style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}
          >
            <Plus size={20} />
            <span>Add</span>
          </button>
        </form>

        {/* Task List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : todos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-secondary)' }}>
            <Sparkles size={28} style={{ color: 'var(--accent-violet)', marginBottom: '0.5rem' }} />
            <p style={{ fontSize: '0.9rem' }}>All done! Add a task above to get started.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {todos.map(todo => (
              <div
                key={todo._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-glass)',
                  transition: 'all 0.2s ease',
                  opacity: todo.completed ? 0.6 : 1
                }}
              >
                {/* Tick Checkbox & Task Text */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, overflow: 'hidden' }}>
                  <button
                    onClick={() => handleToggle(todo._id)}
                    style={{
                      width: '22px',
                      height: '22px',
                      minWidth: '22px',
                      borderRadius: '6px',
                      border: todo.completed ? 'none' : '2px solid var(--text-muted)',
                      background: todo.completed ? 'var(--grad-emerald)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title="Mark done"
                  >
                    {todo.completed && <Check size={15} color="#ffffff" />}
                  </button>

                  <span style={{
                    fontSize: '0.95rem',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                    wordBreak: 'break-word'
                  }}>
                    {todo.title}
                  </span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(todo._id)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '0.3rem',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-rose)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  title="Delete todo"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
