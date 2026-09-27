import React from 'react';
import { Check, Edit2, Trash2, Calendar, CheckSquare, Tag, AlertCircle } from 'lucide-react';

export default function TaskCard({ todo, onToggleComplete, onEdit, onDelete, onToggleSubtask }) {
  const { _id, title, description, completed, priority, category, dueDate, subtasks = [], tags = [] } = todo;

  // Format Due Date
  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    const isOverdue = !completed && date < now;
    const isToday = date.toDateString() === now.toDateString();

    let displayStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    if (isToday) displayStr = 'Today';

    return { displayStr, isOverdue, isToday };
  };

  const dueInfo = formatDueDate(dueDate);
  const completedSubtasks = subtasks.filter(s => s.completed).length;

  return (
    <div className="glass-panel" style={{
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      position: 'relative',
      opacity: completed ? 0.75 : 1,
      transition: 'all 0.25 ease'
    }}>
      
      <div>
        {/* Top Meta Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Priority Badge */}
            <span className={`badge badge-${priority}`}>
              {priority}
            </span>

            {/* Category Tag */}
            {category && (
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                background: 'var(--bg-glass)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-glass)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Tag size={12} />
                {category}
              </span>
            )}
          </div>

          {/* Due Date Badge */}
          {dueInfo && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: dueInfo.isOverdue ? '#f43f5e' : dueInfo.isToday ? '#fbbf24' : 'var(--text-secondary)',
              background: dueInfo.isOverdue ? 'rgba(244, 63, 94, 0.1)' : 'transparent',
              padding: dueInfo.isOverdue ? '0.2rem 0.5rem' : '0',
              borderRadius: '4px'
            }}>
              {dueInfo.isOverdue ? <AlertCircle size={13} /> : <Calendar size={13} />}
              <span>{dueInfo.displayStr}</span>
            </div>
          )}

        </div>

        {/* Title and Completion Checkbox */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <button
            onClick={() => onToggleComplete(_id)}
            style={{
              width: '24px',
              height: '24px',
              minWidth: '24px',
              borderRadius: '6px',
              border: completed ? 'none' : '2px solid var(--text-muted)',
              background: completed ? 'var(--grad-emerald)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginTop: '2px',
              transition: 'all 0.2s ease'
            }}
          >
            {completed && <Check size={16} color="#ffffff" />}
          </button>

          <h3 style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            textDecoration: completed ? 'line-through' : 'none',
            color: completed ? 'var(--text-muted)' : 'var(--text-primary)',
            wordBreak: 'break-word',
            lineHeight: 1.3
          }}>
            {title}
          </h3>
        </div>

        {/* Description */}
        {description && (
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            lineHeight: 1.4,
            paddingLeft: '2.1rem'
          }}>
            {description}
          </p>
        )}

        {/* Subtasks Checklist */}
        {subtasks.length > 0 && (
          <div style={{ margin: '0.75rem 0', paddingLeft: '2.1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckSquare size={13} />
              <span>Subtasks ({completedSubtasks}/{subtasks.length})</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {subtasks.map((sub, idx) => (
                <div key={sub._id || idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <input
                    type="checkbox"
                    checked={sub.completed}
                    onChange={() => onToggleSubtask && onToggleSubtask(_id, sub._id || idx)}
                    style={{ cursor: 'pointer', accentColor: 'var(--accent-violet)' }}
                  />
                  <span style={{
                    textDecoration: sub.completed ? 'line-through' : 'none',
                    color: sub.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                  }}>
                    {sub.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.5rem', paddingLeft: '2.1rem' }}>
            {tags.map((tag, i) => (
              <span key={i} style={{
                fontSize: '0.7rem',
                color: 'var(--accent-cyan)',
                background: 'rgba(6, 182, 212, 0.1)',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px'
              }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

      </div>

      {/* Card Actions Footer */}
      <div style={{
        display: 'flex',
        justify: 'flex-end',
        gap: '0.5rem',
        marginTop: '1rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-glass)'
      }}>
        <button
          onClick={() => onEdit(todo)}
          className="glass-button"
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          title="Edit Task"
        >
          <Edit2 size={14} />
          <span>Edit</span>
        </button>

        <button
          onClick={() => onDelete(_id)}
          className="glass-button btn-danger"
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          title="Delete Task"
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button>
      </div>

    </div>
  );
}
