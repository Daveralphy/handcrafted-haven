/* Designed by Raphael */

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <h1 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
          Contact Us
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', textAlign: 'center', marginBottom: '3rem' }}>
          Have a question or want to get in touch? We would love to hear from you.
        </p>

        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.95rem',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.95rem',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Subject</label>
              <input
                type="text"
                placeholder="What is this about?"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.95rem',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Message</label>
              <textarea
                placeholder="Tell us what is on your mind..."
                rows={5}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.95rem',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <button
              type="button"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-primary)',
                border: 'none',
                padding: '0.875rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Send Message
            </button>

          </div>
        </div>

      </div>
    </main>
  );
}