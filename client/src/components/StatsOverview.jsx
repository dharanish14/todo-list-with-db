import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ListTodo, Flame } from 'lucide-react';

export default function StatsOverview({ stats }) {
  const { total = 0, completed = 0, pending = 0, overdue = 0, urgentCount = 0, completionRate = 0 } = stats || {};

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Progress Card */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.25rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Productivity Overview</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              {completed} of {total} tasks completed
            </p>
          </div>
          <span style={{ fontSize: '1.6rem', fontWeight: 800 }} className="gradient-text">
            {completionRate}%
          </span>
        </div>

        {/* Progress Bar Container */}
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${completionRate}%`,
            height: '100%',
            background: 'var(--grad-primary)',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.6s ease'
          }} />
        </div>
      </div>

      {/* Grid Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem'
      }}>
        
        {/* Total Tasks */}
        <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
            <ListTodo size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{total}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Tasks</div>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{completed}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Completed</div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{pending}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>In Progress</div>
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
            <Flame size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{urgentCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Urgent</div>
          </div>
        </div>

        {/* Overdue */}
        <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
            <AlertTriangle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{overdue}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Overdue</div>
          </div>
        </div>

      </div>
    </div>
  );
}
