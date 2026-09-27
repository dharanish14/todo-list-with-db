import React from 'react';
import { CheckSquare, Plus, Sun, Moon, Database, ShieldCheck } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onOpenNewTaskModal, dbConnected }) {
  return (
    <header className="glass-panel" style={{ borderRadius: '0 0 var(--radius-lg) var(--radius-lg)', marginBottom: '2rem', padding: '1rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <CheckSquare size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }} className="gradient-text">
              TaskFlow Pro
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              Docker & MongoDB Atlas Powered
            </p>
          </div>
        </div>

        {/* Status Indicator & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          {/* DB Indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            background: dbConnected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
            border: `1px solid ${dbConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
            fontSize: '0.8rem',
            color: dbConnected ? '#34d399' : '#fbbf24',
            fontWeight: 600
          }}>
            <Database size={14} />
            <span>{dbConnected ? 'MongoDB Online' : 'Connecting DB...'}</span>
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="glass-button" 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{ padding: '0.55rem' }}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#8b5cf6" />}
          </button>

          {/* Create Task Button */}
          <button onClick={onOpenNewTaskModal} className="glass-button btn-primary">
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>

      </div>
    </header>
  );
}
