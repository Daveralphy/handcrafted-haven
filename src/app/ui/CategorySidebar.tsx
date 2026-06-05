"use client";

import React from 'react';
import RangeSlider from './RangeSlider';

/* Designed by Oribi */

type CategorySidebarProps = {
  categories: string[];
  availabilityOptions: string[];
  selectedCategories: string[];
  selectedAvailability: string[];
  maxPrice: number;
  liveMaxLimit: number; // Dynamic limit prop added to match the database state
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
  liveMaxLimit,
  onCategoryChange,
  onAvailabilityChange,
  onMaxPriceChange,
}: CategorySidebarProps) {
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

      {/* The RangeSlider max is now driven completely by the highest database entry price */}
      <RangeSlider
        label="Price Range"
        value={maxPrice}
        min={0}
        max={liveMaxLimit}
        step={1}
        ariaLabel="Maximum product price"
        formatValue={(value) => value >= liveMaxLimit ? 'Any' : `$${value}`}
        onChange={onMaxPriceChange}
      />

      {/* Group 1: Filter by Category */}
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
          {categories.map((category, index) => (
            <label key={`${category}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}>
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

      {/* Group 3: Additional Filter (Availability Status) */}
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
          {availabilityOptions.map((status, index) => (
            <label key={`${status}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}>
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