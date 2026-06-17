import Link from 'next/link';

/* Designed by Raphael */

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Mission */}
        <section style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            About Handcrafted Haven
          </h1>
          <p style={{ color: '#334155', fontSize: '1.15rem', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
            Handcrafted Haven is a virtual marketplace designed to connect talented artisans with customers who appreciate unique, high-quality handmade products. We foster a sense of community while promoting sustainable consumption and supporting local creators.
          </p>
        </section>

        {/* Goals */}
        <section style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          marginBottom: '3rem'
        }}>
          <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Our Goals
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { emoji: '🎨', title: 'Seller Profiles', desc: 'Enable artisans to showcase their craftsmanship and share their stories.' },
              { emoji: '🛍️', title: 'Product Listings', desc: 'Curated item displays with descriptions, pricing, and images.' },
              { emoji: '🔍', title: 'Search & Filter', desc: 'Intuitive browsing by category, price, and availability.' },
              { emoji: '⭐', title: 'Reviews & Ratings', desc: 'A feedback system for genuine community engagement.' },
            ].map(goal => (
              <div key={goal.title} style={{ padding: '1.5rem', backgroundColor: 'var(--color-background)', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{goal.emoji}</div>
                <h3 style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '0.5rem' }}>{goal.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{goal.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          marginBottom: '3rem'
        }}>
          <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Meet Team 01
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              'Raphael Eferire Daveal',
              'Isaac Hooper',
              'Porter Luke Frazier',
              'Lehi Nyakno Daniel',
              'Christiana Nwachukwu',
              'Oribi Teo- Iyalla',
              'Hann Dowyne Valcourt'
            ].map(name => (
              <div key={name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--color-background)',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-background)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  flexShrink: 0,
                }}>
                  {name.charAt(0)}
                </div>
                <span style={{ color: '#334155', fontSize: '0.9rem', fontWeight: '500' }}>{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Ready to explore?
          </h2>
          <Link href="/products" style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-primary)',
            padding: '1rem 2.5rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            Browse the Collection
          </Link>
        </section>

      </div>
    </main>
  );
}