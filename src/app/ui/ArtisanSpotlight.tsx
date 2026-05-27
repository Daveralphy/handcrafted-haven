import React from 'react';

/* Designed by Raphael */

export default function ArtisanSpotlight() {
  return (
    <section style={{ 
      marginTop: '3rem', 
      padding: '2.5rem 2rem', 
      background: '#ffffff', 
      border: '1px solid #e2e8f0', 
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
    }}>
      <h2 style={{ fontSize: '2rem', color: '#4B0082', marginBottom: '0.25rem', fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
        Artisan Spotlight
      </h2>
      <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem' }}>
        Meet the master creators behind our exceptional community craftsmanship.
      </p>
      
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ 
          width: '140px', 
          height: '140px', 
          backgroundColor: '#4B0082', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#FFFDD0',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          flexShrink: 0,
          boxShadow: '0 6px 16px rgba(75, 0, 130, 0.2)'
        }}>
          Artisan
        </div>
        
        <div style={{ flex: '1', minWidth: '280px' }}>
          <h3 style={{ margin: '0 0 0.75rem 0', color: '#4B0082', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Oribi Teo-Iyalla
          </h3>
          <p style={{ margin: '0', color: '#334155', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Specializing in sustainable heirloom woodwork and intricate custom jewelry design. Every single piece in this signature collection represents a rich narrative of raw local element gathering, calculated patience, and classic time-tested preservation methods optimized for modern everyday environments.
          </p>
        </div>
      </div>
    </section>
  );
}