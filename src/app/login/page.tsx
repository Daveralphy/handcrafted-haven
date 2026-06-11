"use client";

// Custom login form designed for credentials entry and user authentication verification

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      // Auth will be wired here
      alert('Login flow ready — auth coming soon.');
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', padding: '4rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            Sign in to your Handcrafted Haven account.
          </p>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-primary)',
                border: 'none',
                padding: '0.875rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                marginTop: '0.5rem',
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
              Don't have an account?{' '}
              <Link href="/signup" style={{ color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}