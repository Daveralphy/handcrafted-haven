"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
  const productDataKey = JSON.stringify(initialProducts);

  return (
    <ProductGridContent
      key={productDataKey}
      initialProducts={initialProducts}
    />
  );
}

function ProductGridContent({ initialProducts }: ProductGridProps) {
  const categories = Array.from(new Set(initialProducts.map((p) => p.category)));
  const availabilityOptions = Array.from(new Set(initialProducts.map((p) => p.availability)));
  const liveMaxPrice = initialProducts.length > 0
    ? Math.ceil(Math.max(...initialProducts.map(p => Number(p.price))))
    : 0;

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(availabilityOptions);
  const [maxPrice, setMaxPrice] = useState(liveMaxPrice);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(liveMaxPrice);

  useEffect(() => {
    const debounceTimer = window.setTimeout(() => {
      setAppliedMaxPrice(maxPrice);
    }, 250);
    return () => window.clearTimeout(debounceTimer);
  }, [maxPrice]);

  const toggleSelection = (
    value: string,
    selectedValues: string[],
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedValues(
      selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value]
    );
  };

  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = selectedCategories.includes(product.category);
    const matchesAvailability = selectedAvailability.includes(product.availability);
    const matchesPrice = Number(product.price) <= appliedMaxPrice;
    return matchesCategory && matchesAvailability && matchesPrice;
  });

  if (initialProducts.length === 0) {
    return (
      <div style={{
        margin: '3rem 0',
        padding: '4rem 2rem',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧺</div>
        <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '0.75rem' }}>
          No products yet
        </h2>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>
          Our artisans are busy crafting. Check back soon for new arrivals.
        </p>
      </div>
    );
  }

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
      <div className="max-[700.98px]:!w-full max-[700.98px]:!basis-full max-[700.98px]:!min-w-0" style={{ flex: '0 0 240px', minWidth: '240px' }}>
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

      <div className="max-[700.98px]:!w-full max-[700.98px]:!basis-full max-[700.98px]:!min-w-0" style={{ flex: '1 1 0px', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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

        <div className="max-[700.98px]:!grid-cols-[minmax(0,1fr)]" style={{
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

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <span style={{ fontSize: '0.75rem', color: '#334155', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {product.category}
                </span>
                <h4 style={{ fontSize: '1.05rem', color: '#0f172a', margin: 0, fontWeight: '600', fontFamily: 'var(--font-body)', lineHeight: '1.4' }}>
                  {product.title}
                </h4>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <Link href={`/products/${product.id}`} style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-primary)',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)'
                  }}>
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{
            padding: '3rem 2rem',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔍</div>
            <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
              No products match your current filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
