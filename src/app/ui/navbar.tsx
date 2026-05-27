"use client";

/* Designed by Luke */

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

export default function Navbar({
  brandTitle,
  cartAction,
  cartItemCount = 0,
  navItems = [],
  searchAction,
}: NavbarProps) {
  return (
    <header style={{ backgroundColor: '#4B0082', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '100%' }}>
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
        <Link href="/" style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: '#FFFDD0',
          textDecoration: 'none',
          letterSpacing: '0.5px'
        }}>
          {brandTitle}
        </Link>

        {/* Navigation Items Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{
              color: '#e2d9f3',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              {item.label}
            </Link>
          ))}
          
          <Link href={searchAction.href} aria-label={searchAction.label} style={{ color: '#FFFDD0', display: 'flex', alignItems: 'center' }}>
            <SearchIcon />
          </Link>
          
          <Link
            href={cartAction.href}
            aria-label={`${cartAction.label} with ${cartItemCount} items`}
            style={{ color: '#FFFDD0', display: 'flex', alignItems: 'center', position: 'relative' }}
          >
            <CartIcon />
            {cartItemCount > 0 ? (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                backgroundColor: '#FFBF00',
                color: '#4B0082',
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
        </div>
      </nav>
    </header>
  );
}