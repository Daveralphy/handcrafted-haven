import React from 'react';

/* Designed by Raphael - Powered by Live Database Data */

interface Artisan {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface ArtisanSpotlightProps {
  artisans?: Artisan[];
}

export default function ArtisanSpotlight({ artisans = [] }: ArtisanSpotlightProps) {
  // Fallback layout data matching your original design structure if the database table is empty
  if (!artisans || artisans.length === 0) {
    return (
      <section style={{ 
        marginTop: '3rem', 
        padding: '2.5rem 2rem', 
        background: '#ffffff', 
        border: '1px solid #e2e8f0', 
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
      }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>
          Artisan Spotlight
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem' }}>
          Meet the master creators behind our exceptional community craftsmanship.
        </p>
        
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ 
            width: '140px', 
            height: '140px', 
            backgroundColor: 'var(--color-primary)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--color-background)',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            flexShrink: 0,
            boxShadow: '0 6px 16px rgba(75, 0, 130, 0.2)'
          }}>
            Oribi
          </div>
          
          <div style={{ flex: '1', minWidth: '280px' }}>
            <h3 style={{ margin: '0 0 0.75rem 0', color: 'var(--color-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
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

  // Active layout template rendering dynamic rows directly from your Supabase connection strings
  return (
    <section style={{ 
      marginTop: '3rem', 
      padding: '2.5rem 2rem', 
      background: '#ffffff', 
      border: '1px solid #e2e8f0', 
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
    }}>
      <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>
        Artisan Spotlight
      </h2>
      <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem' }}>
        Meet the master creators behind our exceptional community craftsmanship.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {artisans.map((artisan) => (
          <div key={artisan.id} style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap', borderBottom: artisans.length > 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: artisans.length > 1 ? '1.5rem' : '0' }}>
            <div style={{ 
              width: '140px', 
              height: '140px', 
              backgroundColor: 'var(--color-primary)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--color-background)',
              fontSize: '2rem',
              fontWeight: 'bold',
              flexShrink: 0,
              boxShadow: '0 6px 16px rgba(75, 0, 130, 0.15)',
              textTransform: 'uppercase'
            }}>
              {artisan.name ? artisan.name.charAt(0) : 'A'}
            </div>
            
            <div style={{ flex: '1', minWidth: '280px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {artisan.name}
              </h3>
              <p style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'capitalize', fontWeight: '600' }}>
                Verified community {artisan.role}
              </p>
              <p style={{ margin: '0', color: '#334155', fontSize: '1.05rem', lineHeight: '1.7' }}>
                Registered profile email contact point: <strong>{artisan.email}</strong>. Specializing in handcrafted inventory additions, custom product design, and creative catalog fulfillment processes mapped to the Handcrafted Haven platform requirements.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}