import React from 'react';

/* Designed by Oribi */

export default function CategorySidebar() {
  const categories = ['Woodwork', 'Jewelry', 'Pottery', 'Textiles'];
  const availability = ['In Stock', 'Custom Order Only'];
  
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Group 1: Filter by Category */}
      <div>
        <h3 style={{
          fontSize: '0.9rem',
          fontWeight: 'bold',
          color: 'var(--color-primary)',
          margin: '0 0 1rem 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontFamily: 'var(--font-body)'
        }}>
          Filter by Category
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {categories.map((category) => (
            <label key={category} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                defaultChecked={category === 'Woodwork'}
                style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px', cursor: 'pointer' }} 
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Group 2: Additional Filter (Availability Status) to make card taller */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
        <h3 style={{
          fontSize: '0.9rem',
          fontWeight: 'bold',
          color: 'var(--color-primary)',
          margin: '0 0 1rem 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontFamily: 'var(--font-body)'
        }}>
          Availability
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {availability.map((status) => (
            <label key={status} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                defaultChecked={status === 'In Stock'}
                style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px', cursor: 'pointer' }} 
              />
              {status}
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}
