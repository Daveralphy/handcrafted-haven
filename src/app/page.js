export default function Home() {
  return (
    <div style={{ backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero Section */}
        <section style={{ 
          marginBottom: '3rem', 
          padding: '2rem', 
          background: '#ffffff', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '0.5rem' }}>Welcome to Handcrafted Haven</h1>
          <p style={{ color: '#64748b', fontSize: '1.125rem' }}>Discover authentic, artisan-made crafts from talented creators worldwide.</p>
        </section>

        {/* Featured Categories Section */}
        <section style={{ 
          marginBottom: '3rem', 
          padding: '2rem', 
          background: '#ffffff', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '1.5rem' }}>Featured Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {['Woodwork', 'Jewelry', 'Pottery', 'Textiles'].map((category) => (
              <div key={category} style={{
                padding: '1.5rem',
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#0f172a',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}>
                {category}
              </div>
            ))}
          </div>
        </section>

        {/* Artisan Spotlight Section */}
        <section style={{ 
          marginTop: '3rem', 
          padding: '2rem', 
          background: '#ffffff', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '0.5rem' }}>Artisan Spotlight</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Meet the creators behind the custom craftsmanship.</p>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Placeholder Slot for Artisan Image */}
            <div style={{ 
              width: '120px', 
              height: '120px', 
              backgroundColor: '#cbd5e1', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#475569',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              Photo
            </div>
            
            {/* Artisan Bio Text Details */}
            <div style={{ flex: '1', minWidth: '250px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Oribi Teo-Iyalla</h3>
              <p style={{ margin: '0', color: '#334155', lineHeight: '1.6' }}>
                Specializing in handcrafted sustainable woodwork and custom jewelry design. Every piece in this collection tells a story of dedicated patience, sourcing raw local elements, and preserving functional master craftsmanship for everyday environments.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ 
        marginTop: '5rem', 
        paddingTop: '1.5rem', 
        borderTop: '1px solid #e2e8f0', 
        textAlign: 'center', 
        color: '#94a3b8',
        fontSize: '0.875rem',
        padding: '1.5rem 2rem'
      }}>
        <p>&copy; {new Date().getFullYear()} Handcrafted Haven Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
}
