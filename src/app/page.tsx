import React from 'react';
import Hero from './ui/Hero';
import ProductGrid from './ui/ProductGrid';
import ArtisanSpotlight from './ui/ArtisanSpotlight';
import Footer from './ui/Footer';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#FFFDD0', fontFamily: 'Noto Sans, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Centralized Page Body Orchestrator */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', flexGrow: 1, width: '100%', boxSizing: 'border-box' }}>
        
        <Hero />
        
        {/* Dynamic, 4-item side-by-side marketplace element card loop layout */}
        <ProductGrid />
        
        <ArtisanSpotlight />

      </main>

      <Footer />

    </div>
  );
}