import React from 'react';
import Link from 'next/link';

/* Designed by Christiana */

export default function Hero() {
  return (
    <section style={{
      marginBottom: '3rem',
      padding: '4rem 2rem',
      background: 'var(--color-primary)',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(75, 0, 130, 0.15)'
    }}>
      <h1 style={{
        fontSize: '3rem',
        color: 'var(--color-background)',
        marginBottom: '1rem',
        fontFamily: 'var(--font-heading)',
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

      <Link href="/products" style={{
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-primary)',
        padding: '1rem 2.5rem',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '1.125rem',
        textDecoration: 'none',
        display: 'inline-block',
        marginTop: '1rem'
      }}>
        Shop Now
      </Link>
    </section>
  );
}
