import React from 'react';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#FFFDD0', fontFamily: 'Noto Sans, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', flexGrow: 1, width: '100%', boxSizing: 'border-box' }}>

        {/* Hero Section - Christiana */}
        <section style={{
          marginBottom: '3rem',
          padding: '4rem 2rem',
          background: '#4B0082',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(75, 0, 130, 0.15)'
        }}>
          <h1 style={{
            fontSize: '3rem',
            color: '#FFFDD0',
            marginBottom: '1rem',
            fontFamily: 'Playfair Display, serif',
            lineHeight: '1.2'
          }}>
            Discover Unique Handcrafted Treasures
          </h1>

          <p style={{
            color: '#e2d9f3',
            fontSize: '1.25rem',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            lineHeight: '1.6'
          }}>
            Connect with talented artisans and find one-of-a-kind
            handmade products made with love and dedication.
          </p>

          <a href="/products" style={{
            backgroundColor: '#FFBF00',
            color: '#4B0082',
            padding: '1rem 2.5rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.125rem',
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '1rem'
          }}>
            Shop Now
          </a>
        </section>

        {/* Featured Categories Section - Oribi */}
        <section style={{ 
          marginBottom: '3rem', 
          padding: '2rem', 
          background: '#ffffff',
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ fontSize: '1.75rem', color: '#4B0082', marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
            Featured Categories
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {['Woodwork', 'Jewelry', 'Pottery', 'Textiles'].map((category) => (
              <div key={category} style={{
                padding: '1.5rem',
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#4B0082',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                {category}
              </div>
            ))}
          </div>
        </section>

        {/* Artisan Spotlight Section - Raphael */}
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
            {/* Elegant Colored Avatar Container for Artisan Image */}
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
            
            {/* Artisan Bio Text Details */}
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

      </main>

      {/* Global Page Footer - Raphael */}
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

    </div>
  );
}