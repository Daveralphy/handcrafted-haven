"use client";

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

// I don't think these will be necessary, but I implemented them anyways, we can remove later.
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
// --------------------------------------------------------------------------------------------


function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      {isOpen ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7h16M4 12h16M4 17h16"
        />
      )}
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-navbar">
      <nav aria-label="Main navigation">
        <Link href="/">{brandTitle}</Link>

        <div>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href={searchAction.href} aria-label={searchAction.label}>
            <SearchIcon />
          </Link>
          <Link
            href={cartAction.href}
            aria-label={`${cartAction.label} with ${cartItemCount} items`}
          >
            <CartIcon />
            {cartItemCount > 0 ? (
              <span>{cartItemCount}</span>
            ) : null}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <MenuIcon isOpen={isMenuOpen} />
        </button>
      </nav>

      {isMenuOpen ? (
        <div>
          <div className="site-navbar-menu">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div>
              <Link
                href={searchAction.href}
                aria-label={searchAction.label}
                onClick={() => setIsMenuOpen(false)}
              >
                <SearchIcon />
              </Link>
              <Link
                href={cartAction.href}
                aria-label={`${cartAction.label} with ${cartItemCount} items`}
                onClick={() => setIsMenuOpen(false)}
              >
                <CartIcon />
                {cartItemCount > 0 ? (
                  <span>{cartItemCount}</span>
                ) : null}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
