import React from 'react';

/* Designed by Christiana */

export default function Hero() {
  return (
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
  );
}