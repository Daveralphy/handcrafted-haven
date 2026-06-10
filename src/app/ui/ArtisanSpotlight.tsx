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
  if (!artisans || artisans.length === 0) {
    return (
      <section style={{
        marginTop: '3rem',
        padding: '2.5rem 2rem',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>
          Artisan Spotlight
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem' }}>
          Meet the master creators behind our exceptional community craftsmanship.
        </p>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>
          Our artisans are getting their profiles ready. Check back soon to meet the makers.
        </p>
      </section>
    );
  }

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
        {artisans.map((artisan, index) => (
          <div key={artisan.id} style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            borderBottom: index < artisans.length - 1 ? '1px solid #f1f5f9' : 'none',
            paddingBottom: index < artisans.length - 1 ? '1.5rem' : '0'
          }}>
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
              {artisan.name ? artisan.name.charAt(0) : '?'}
            </div>

            <div style={{ flex: '1', minWidth: '280px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {artisan.name}
              </h3>
              <p style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'capitalize', fontWeight: '600' }}>
                Verified Community {artisan.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}