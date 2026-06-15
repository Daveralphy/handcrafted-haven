"use client";

/* Designed by Porter Luke Frazier - Stabilized for Dynamic Limits */

import React, { useEffect, useState } from 'react';

type RangeSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  ariaLabel: string;
  formatValue?: (value: number) => string;
  onChange: (value: number) => void;
};

export default function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  ariaLabel,
  formatValue = (rangeValue) => `${rangeValue}`,
  onChange,
}: RangeSliderProps) {
  const [displayValuePosition, setDisplayValuePosition] = useState(value);

  useEffect(() => {
    const debounceTimer = window.setTimeout(() => {
      setDisplayValuePosition(value);
    }, 250);

    return () => window.clearTimeout(debounceTimer);
  }, [value]);

  // Dynamic safety guard boundary calculation eliminates the divide-by-zero errors when sliding rapidly
  const rangeDenominator = max - min;
  const clampedPositionValue = Math.min(Math.max(displayValuePosition, min), max);
  const positionPercent = rangeDenominator > 0 
    ? ((clampedPositionValue - min) / rangeDenominator) * 100 
    : 100;

  const labelPosition = `${positionPercent}%`;
  
  const valueLabelTransform = displayValuePosition <= min
    ? 'translateX(0)'
    : displayValuePosition >= max
      ? 'translateX(-100%)'
      : 'translateX(-50%)';

  return (
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
        {label}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <div style={{ position: 'relative', height: '1.5rem', width: '100%' }}>
          <span style={{
            color: '#334155',
            fontSize: '0.95rem',
            fontWeight: '600',
            left: labelPosition,
            position: 'absolute',
            transform: valueLabelTransform,
            // Adds an overshoot effect to the label.
            transition: 'left 0.2s cubic-bezier(0.34, 1.35, 0.64, 1)',
            whiteSpace: 'nowrap'
          }}>
            {formatValue(value)}
          </span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-label={ariaLabel}
          style={{ accentColor: 'var(--color-primary)', width: '100%', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}
