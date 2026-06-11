"use client";

/* Designed by Porter Luke Frazier */

import Link from "next/link";
import { useState } from "react";
import type { NavItem } from "../site-config";

type NavAction = {
  label: string;
  href: string;
};

type NavbarProps = {
  brandTitle: string;
  cartAction: NavAction;
  cartItemCount?: number;
  navItems?: NavItem[];
  searchAction: NavAction;
};

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35m1.1-5.4a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H6M10 20.5h.01M18 20.5h.01"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
}

export default function Navbar({
  brandTitle,
  cartAction,
  cartItemCount = 0,
  navItems = [],
  searchAction,
}: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header style={{ backgroundColor: 'var(--color-primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '100%' }}>
      <nav aria-label="Main navigation" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box'
      }}>

        {/* Brand Logo Title Left */}
        <Link href="/" className="text-background no-underline transition-colors hover:text-accent" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.75rem',
          fontWeight: 'bold',
          letterSpacing: '0.5px'
        }}>
          {brandTitle}
        </Link>

        {/* Navigation Items Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-[#e2d9f3] no-underline transition-colors hover:text-accent" style={{
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              {item.label}
            </Link>
          ))}

          <Link href={searchAction.href} aria-label={searchAction.label} className="text-background transition-colors hover:text-accent" style={{ display: 'flex', alignItems: 'center' }}>
            <SearchIcon />
          </Link>

          <Link
            href={cartAction.href}
            aria-label={`${cartAction.label} with ${cartItemCount} items`}
            className="text-background transition-colors hover:text-accent"
            style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
          >
            <CartIcon />
            {cartItemCount > 0 ? (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-primary)',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                borderRadius: '50%',
                padding: '2px 6px',
                lineHeight: 1
              }}>
                {cartItemCount}
              </span>
            ) : null}
          </Link>

          {/* Profile Icon with Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Profile menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--color-background)',
                padding: '0',
              }}
              className="transition-colors hover:text-accent"
            >
              <ProfileIcon />
            </button>

            {profileOpen && (
              <>
                {/* Backdrop to close dropdown when clicking outside */}
                <div
                  onClick={() => setProfileOpen(false)}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 10,
                  }}
                />

                {/* Dropdown Menu */}
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.75rem)',
                  right: 0,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  minWidth: '180px',
                  zIndex: 20,
                  overflow: 'hidden',
                }}>
                  <Link
                    href="/login"
                    onClick={() => setProfileOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1.25rem',
                      color: '#0f172a',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      borderBottom: '1px solid #f1f5f9',
                    }}
                    className="hover:text-accent"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setProfileOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1.25rem',
                      color: '#0f172a',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                    }}
                    className="hover:text-accent"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>

        </div>
      </nav>
    </header>
  );
}