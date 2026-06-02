"use client";

import React, { useEffect, useState } from 'react';

/* Designed by Oribi */

type CategorySidebarProps = {
  categories: string[];
  availabilityOptions: string[];
  selectedCategories: string[];
  selectedAvailability: string[];
  maxPrice: number;
  onCategoryChange: (category: string) => void;
  onAvailabilityChange: (availability: string) => void;
  onMaxPriceChange: (maxPrice: number) => void;
};

export default function CategorySidebar({
  categories,
  availabilityOptions,
  selectedCategories,
  selectedAvailability,
  maxPrice,
  onCategoryChange,
  onAvailabilityChange,
  onMaxPriceChange,
}: CategorySidebarProps) {
  const [displayPricePosition, setDisplayPricePosition] = useState(maxPrice);
  const priceLabel = maxPrice >= 200 ? 'Any' : `$${maxPrice}`;
  // Prevents price amount label from overflowing.
  const priceThumbPosition = `${(displayPricePosition / 200) * 100}%`;
  const priceLabelTransform = displayPricePosition === 0
    ? 'translateX(0)'
    : displayPricePosition >= 200
      ? 'translateX(-100%)'
      : 'translateX(-50%)';

  useEffect(() => {
    const debounceTimer = window.setTimeout(() => {
      setDisplayPricePosition(maxPrice);
    }, 250);

    return () => window.clearTimeout(debounceTimer);
  }, [maxPrice]);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        color: 'var(--color-primary)',
        fontFamily: 'var(--font-heading)',
        fontSize: '1.65rem',
        fontWeight: 'bold',
        lineHeight: 1,
        margin: 0
      }}>
        Filter
      </h2>

      {/* Group 1: Filter by Price */}
      <div>
        <h3 style={{
          fontSize: '0.9rem',
          fontWeight: 'bold',
          color: 'var(--color-primary)',
          margin: '0 0 1rem 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontFamily: 'var(--font-body)'
        }}>
          Price Range
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <div style={{ position: 'relative', height: '1.5rem' }}>
            <span style={{
              color: '#334155',
              fontSize: '0.95rem',
              fontWeight: '600',
              left: priceThumbPosition,
              position: 'absolute',
              transform: priceLabelTransform,
              transition: 'left 0.2s cubic-bezier(0.34, 1.35, 0.64, 1)',
              whiteSpace: 'nowrap'
            }}>
              {priceLabel}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            step="5"
            value={maxPrice}
            onChange={(event) => onMaxPriceChange(Number(event.target.value))}
            aria-label="Maximum product price"
            style={{ accentColor: 'var(--color-primary)', width: '100%', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Group 2: Filter by Category */}
      <div>
        <h3 style={{
          fontSize: '0.9rem',
          fontWeight: 'bold',
          color: 'var(--color-primary)',
          margin: '0 0 1rem 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontFamily: 'var(--font-body)'
        }}>
          Category
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {categories.map((category) => (
            <label key={category} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Group 3: Additional Filter (Availability Status) to make card taller */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
        <h3 style={{
          fontSize: '0.9rem',
          fontWeight: 'bold',
          color: 'var(--color-primary)',
          margin: '0 0 1rem 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontFamily: 'var(--font-body)'
        }}>
          Availability
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {availabilityOptions.map((status) => (
            <label key={status} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedAvailability.includes(status)}
                onChange={() => onAvailabilityChange(status)}
                style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              {status}
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}
