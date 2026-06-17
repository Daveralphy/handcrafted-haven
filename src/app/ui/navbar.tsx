"use client";

/* Designed by Porter Luke Frazier */

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
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
};

function CartIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H6M10 20.5h.01M18 20.5h.01" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

export default function Navbar({
  brandTitle,
  cartAction,
  cartItemCount = 0,
  navItems = [],
}: NavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setProfileOpen(false);
    router.push('/');
    router.refresh();
  };

  const userName = user?.user_metadata?.name || user?.email || '';
  const userRole = user?.user_metadata?.role || '';
  const initials = userName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header style={{ backgroundColor: 'var(--color-primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '100%' }}>
      <style>{`
        @media (max-width: 700px) {
          .mobile-nav-menu {
            padding: 0.75rem !important;
          }
          .mobile-nav-item {
            padding: 0.65rem 0.9rem !important;
          }
        }
      `}</style>
      <nav
        aria-label="Main navigation"
        className="relative max-[700.98px]:!px-4 max-[700.98px]:!py-3"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-background no-underline transition-colors hover:text-accent max-[700.98px]:max-w-[calc(100%_-_10rem)] max-[700.98px]:text-[1.6rem] max-[700.98px]:leading-[1.15]"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 'bold', letterSpacing: '0.5px' }}
        >
          {brandTitle}
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 3vw, 2rem)' }}>
          {/* Navigation Items */}
          <div
            id="site-navigation-links"
            className={`mobile-nav-menu max-[700.98px]:absolute max-[700.98px]:left-auto max-[700.98px]:right-4 max-[700.98px]:top-[calc(100%+0.35rem)] max-[700.98px]:w-56 max-[700.98px]:max-w-[calc(100vw_-_2rem)] max-[700.98px]:!gap-0 max-[700.98px]:rounded-lg max-[700.98px]:border max-[700.98px]:border-white/20 max-[700.98px]:bg-primary max-[700.98px]:shadow-[0_12px_30px_rgba(30,0,50,0.28)] ${mobileMenuOpen ? "max-[700.98px]:!flex max-[700.98px]:!flex-col" : "max-[700.98px]:!hidden"
              }`}
            style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-item text-[#e2d9f3] no-underline transition-colors hover:text-accent max-[700.98px]:min-h-9 max-[700.98px]:w-full max-[700.98px]:rounded-md max-[700.98px]:hover:bg-white/10"
                style={{ fontWeight: '600', fontSize: '1rem' }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            {/* Unecessary and unable to implement in time.
             <Link
              href={searchAction.href}
              aria-label={searchAction.label}
              onClick={() => setMobileMenuOpen(false)}
              className="text-background transition-colors hover:text-accent"
              style={{ display: 'grid', placeItems: 'center', width: '32px', height: '32px' }}
            >
              <SearchIcon />
            </Link> */}

            <Link
              href={cartAction.href}
              aria-label={`${cartAction.label} with ${cartItemCount} items`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-background transition-colors hover:text-accent"
              style={{ display: 'grid', placeItems: 'center', width: '32px', height: '32px', position: 'relative' }}
            >
              <CartIcon />
              {cartItemCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  minWidth: '1rem',
                  height: '1rem',
                  display: 'grid',
                  placeItems: 'center',
                  lineHeight: 1
                }}>
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Profile Icon with Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-label="Profile menu"
                aria-expanded={profileOpen}
                className="transition-colors hover:text-accent"
                style={{
                  background: user ? 'var(--color-accent)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: user ? 'var(--color-primary)' : 'var(--color-background)',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  borderRadius: user ? '50%' : '8px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                }}
              >
                {loading ? <ProfileIcon /> : user ? (initials || <ProfileIcon />) : <ProfileIcon />}
              </button>

              {profileOpen && (
                <>
                  <div onClick={() => setProfileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 10 }} />
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.75rem)',
                    right: 0,
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    minWidth: '200px',
                    zIndex: 20,
                    overflow: 'hidden',
                  }}>
                    {user ? (
                      <>
                        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #f1f5f9' }}>
                          <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem', color: '#0f172a' }}>{userName}</p>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', textTransform: 'capitalize' }}>{userRole}</p>
                        </div>
                        {userRole === 'artisan' && (
                          <Link
                            href="/dashboard"
                            onClick={() => setProfileOpen(false)}
                            style={{ display: 'block', padding: '0.75rem 1.25rem', color: '#0f172a', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500', borderBottom: '1px solid #f1f5f9' }}
                            className="hover:text-accent"
                          >
                            Dashboard
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={handleSignOut}
                          style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1.25rem', color: '#ef4444', fontSize: '0.95rem', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setProfileOpen(false)}
                          style={{ display: 'block', padding: '0.75rem 1.25rem', color: '#0f172a', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500', borderBottom: '1px solid #f1f5f9' }}
                          className="hover:text-accent"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/signup"
                          onClick={() => setProfileOpen(false)}
                          style={{ display: 'block', padding: '0.75rem 1.25rem', color: '#0f172a', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}
                          className="hover:text-accent"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="hidden cursor-pointer rounded-md border-0 bg-transparent p-2 text-background transition-colors hover:text-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-[700.98px]:flex"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="site-navigation-links"
              onClick={() => {
                setMobileMenuOpen((open) => !open);
                setProfileOpen(false);
              }}
            >
              <MenuIcon open={mobileMenuOpen} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
