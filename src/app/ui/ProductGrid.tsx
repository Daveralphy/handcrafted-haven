"use client";

import React, { useEffect, useState } from 'react';
import CategorySidebar from './CategorySidebar';

/* Designed by Oribi - 100% Dynamic Data Driven */

interface DBProduct {
  id: string | number;
  title: string;
  price: number;
  category: string;
  availability: string;
}

interface ProductGridProps {
  initialProducts: DBProduct[];
}

export default function ProductGrid({ initialProducts = [] }: ProductGridProps) {
  // Dynamically calculate existing categories from database rows
  const categories = Array.from(new Set(initialProducts.map((product) => product.category || 'Uncategorized')));
  
  // Dynamically calculate availability options straight from database rows
  const availabilityOptions = Array.from(new Set(initialProducts.map((product) => product.availability || 'Unknown')));
  
  // Find the absolute highest priced product in your live database dynamically
  const liveMaxPrice = initialProducts.length > 0 
    ? Math.ceil(Math.max(...initialProducts.map(p => Number(p.price || 0)))) 
    : 100;

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(availabilityOptions);
  const [maxPrice, setMaxPrice] = useState(liveMaxPrice);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(liveMaxPrice);

  // Keep state perfectly synchronized whenever database updates hit the client side runtime context safely
  useEffect(() => {
    const updatedCategories = Array.from(new Set(initialProducts.map((p) => p.category || 'Uncategorized')));
    const updatedAvailability = Array.from(new Set(initialProducts.map((p) => p.availability || 'Unknown')));
    const updatedMaxPrice = initialProducts.length > 0 ? Math.ceil(Math.max(...initialProducts.map(p => Number(p.price || 0)))) : 100;

    setSelectedCategories(updatedCategories);
    setSelectedAvailability(updatedAvailability);
    setMaxPrice(updatedMaxPrice);
    setAppliedMaxPrice(updatedMaxPrice);
  }, [initialProducts]); // Fixed: removed liveMaxPrice from the array to maintain constant array size

  const toggleSelection = (
    value: string,
    selectedValues: string[],
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedValues(
      selectedValues.includes(value)
        ? selectedValues.filter((selectedValue) => selectedValue !== value)
        : [...selectedValues, value]
    );
  };

  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = selectedCategories.includes(product.category || 'Uncategorized');
    const matchesAvailability = selectedAvailability.includes(product.availability || 'Unknown');
    const matchesPrice = Number(product.price || 0) <= appliedMaxPrice;

    return matchesCategory && matchesAvailability && matchesPrice;
  });

  useEffect(() => {
    const debounceTimer = window.setTimeout(() => {
      setAppliedMaxPrice(maxPrice);
    }, 250);

    return () => window.clearTimeout(debounceTimer);
  }, [maxPrice]);

  return (
    <section style={{
      margin: '3rem 0',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      gap: '2rem',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    }}>

      {/* Left Column: Slim Interactive Filter Sidebar Component */}
      <div style={{ flex: '0 0 240px', minWidth: '240px' }}>
        <CategorySidebar
          categories={categories}
          availabilityOptions={availabilityOptions}
          selectedCategories={selectedCategories}
          selectedAvailability={selectedAvailability}
          maxPrice={maxPrice}
          liveMaxLimit={liveMaxPrice}
          onCategoryChange={(category) => toggleSelection(category, selectedCategories, setSelectedCategories)}
          onAvailabilityChange={(availability) => toggleSelection(availability, selectedAvailability, setSelectedAvailability)}
          onMaxPriceChange={setMaxPrice}
        />
      </div>

      {/* Right Column: Section Header + Dynamic Product Grid Cards */}
      <div style={{ flex: '1 1 0px', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Marketplace Section Header Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '0.75rem',
          width: '100%'
        }}>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary)', margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>
            Featured Products
          </h2>
          <span style={{ fontSize: '0.95rem', color: '#334155', fontWeight: '500' }}>
            Showing {filteredProducts.length} products
          </span>
        </div>

        {/* CSS Grid wrapping mapped data cards evenly across multiple rows */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          width: '100%'
        }}>
          {filteredProducts.map((product) => (
            <article key={product.id} style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Image Preview Block */}
              <div style={{
                height: '160px',
                backgroundColor: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontSize: '0.85rem',
                fontWeight: '500',
                padding: '1rem',
                textAlign: 'center'
              }}>
                [ {product.category} Image View ]
              </div>

              {/* Context Detail Block */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <span style={{ fontSize: '0.75rem', color: '#334155', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {product.category}
                </span>
                <h4 style={{ fontSize: '1.05rem', color: '#0f172a', margin: 0, fontWeight: '600', fontFamily: 'var(--font-body)', lineHeight: '1.4' }}>
                  {product.title}
                </h4>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    ${Number(product.price || 0).toFixed(2)}
                  </span>
                  <button type="button" style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-primary)',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p style={{ color: '#334155', fontWeight: '500', margin: 0 }}>
            No products match the selected filters.
          </p>
        )}

      </div>

    </section>
  );
}