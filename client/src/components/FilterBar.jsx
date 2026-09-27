import React from 'react';
import { Search, Filter, SortAsc, Tag } from 'lucide-react';

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  priority,
  setPriority,
  completedFilter,
  setCompletedFilter,
  categories,
  sortBy,
  setSortBy
}) {
  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
      
      {/* Search Input Row */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        
        {/* Search Bar */}
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search tasks, descriptions or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.4rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-glass)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Status Tab Selector */}
        <div style={{ display: 'flex', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', padding: '3px', border: '1px solid var(--border-glass)' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'false', label: 'In Progress' },
            { id: 'true', label: 'Completed' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCompletedFilter(tab.id)}
              style={{
                border: 'none',
                background: completedFilter === tab.id ? 'var(--grad-primary)' : 'transparent',
                color: completedFilter === tab.id ? '#ffffff' : 'var(--text-secondary)',
                padding: '0.45rem 1rem',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Secondary Filter Dropdowns */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: '160px' }}>
          <Tag size={16} color="var(--text-muted)" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: '150px' }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          >
            <option value="All">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: '160px', marginLeft: 'auto' }}>
          <SortAsc size={16} color="var(--text-muted)" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          >
            <option value="createdAt">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority Level</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>

      </div>

    </div>
  );
}
