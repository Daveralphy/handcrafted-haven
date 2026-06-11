"use client";

/* Designed by Raphael */

import { useState } from 'react';
import Link from 'next/link';

type Role = 'customer' | 'artisan' | null;

export default function SignupPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: '',
    bio: '',
  });
  const [error, setError] = useState('');

  const handleFormChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  const handleNext = () => {
    if (!role) {
      setError('Please select a role to continue.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = () => {
    setError('');
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    // Auth will be wired here
    alert('Signup flow ready — auth coming soon.');
  };

  return (
    <main style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', padding: '4rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '560px' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Create an Account
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            {step === 1 ? 'First, tell us who you are.' : `Setting up your ${role} account.`}
          </p>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          {[1, 2].map((s) => (
            <div key={s} style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: step >= s ? 'var(--color-primary)' : '#e2e8f0',
              color: step >= s ? 'var(--color-background)' : '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '0.9rem',
            }}>
              {s}
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        }}>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              color: '#991b1b',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
            }}>
              {error}
            </div>
          )}

          {/* Step 1 — Role Selection */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ color: '#0f172a', fontWeight: 'bold', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>
                I am joining as a...
              </h2>
              {(['customer', 'artisan'] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleSelect(r)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: '10px',
                    border: `2px solid ${role === r ? 'var(--color-primary)' : '#e2e8f0'}`,
                    backgroundColor: role === r ? '#f5f0ff' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '0.25rem', textTransform: 'capitalize' }}>
                    {r === 'customer' ? '🛍️ Customer' : '🎨 Artisan'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    {r === 'customer'
                      ? 'Browse and purchase unique handcrafted products.'
                      : 'Sell your handcrafted products to a global audience.'}
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={handleNext}
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                  border: 'none',
                  padding: '0.875rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                }}
              >
                Next
              </button>

              <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                Already have an account?{' '}
                <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }}>
                  Sign In
                </Link>
              </p>
            </div>
          )}

          {/* Step 2 — Account Details */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => handleFormChange('name', e.target.value)}
                  placeholder="Your full name"
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleFormChange('email', e.target.value)}
                  placeholder="your@email.com"
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => handleFormChange('password', e.target.value)}
                  placeholder="At least 6 characters"
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Confirm Password</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => handleFormChange('confirmPassword', e.target.value)}
                  placeholder="Repeat your password"
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              {role === 'artisan' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Specialty</label>
                    <select
                      value={form.specialty}
                      onChange={e => handleFormChange('specialty', e.target.value)}
                      style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', backgroundColor: '#ffffff', width: '100%', boxSizing: 'border-box' }}
                    >
                      <option value="">Select your craft...</option>
                      {['Woodwork', 'Jewelry', 'Pottery', 'Textiles', 'Ceramics', 'Leather Goods', 'Metalwork', 'Other'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Short Bio</label>
                    <textarea
                      value={form.bio}
                      onChange={e => handleFormChange('bio', e.target.value)}
                      placeholder="Tell customers about yourself and your craft..."
                      rows={3}
                      style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1,
                    backgroundColor: '#f1f5f9',
                    color: '#334155',
                    border: '1px solid #e2e8f0',
                    padding: '0.875rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  style={{
                    flex: 2,
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-primary)',
                    border: 'none',
                    padding: '0.875rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Create Account
                </button>
              </div>

              <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                Already have an account?{' '}
                <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }}>
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}