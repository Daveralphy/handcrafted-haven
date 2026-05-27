import React from 'react';

/* Designed by Raphael */

export default function Footer() {
  return (
    <footer style={{ 
      marginTop: '5rem', 
      backgroundColor: '#4B0082',
      color: '#FFFDD0',
      textAlign: 'center', 
      fontSize: '0.95rem',
      padding: '2.5rem 2rem',
      boxShadow: '0 -4px 20px rgba(75, 0, 130, 0.15)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p style={{ fontWeight: '500', margin: 0 }}>
          &copy; {new Date().getFullYear()} Handcrafted Haven Marketplace. Created by Team 01.
        </p>
        <p style={{ color: '#e2d9f3', fontSize: '0.85rem', margin: 0 }}>
          Fostering creative communities, promoting sustainable consumption, and supporting local artisan families.
        </p>
      </div>
    </footer>
  );
}