export default function Home() {
  const categories = ['Ceramics', 'Leather Goods', 'Metalwork', 'Textiles'];
  const products = [
    { id: 1, name: 'Hand-Thrown Ceramic Vase', price: '$85' },
    { id: 2, name: 'Embroidered Leather Bag', price: '$120' },
    { id: 3, name: 'Copper Metalwork Sculpture', price: '$150' },
    { id: 4, name: 'Hand-Woven Textile Wall Hanging', price: '$95' },
    { id: 5, name: 'Ceramic Dinnerware Set', price: '$180' },
    { id: 6, name: 'Artisan Leather Journal', price: '$45' },
  ];

  return (
    <>
      {/* Header */}
      <header>
        <div className="logo">Artisan Collective</div>
        <nav>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#artisans">Artisans</a>
          <a href="#contact">Contact</a>
          <div className="nav-icons">
            <button aria-label="Search" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>🔍</button>
            <button aria-label="Cart" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>🛒</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Discover Handcrafted Excellence</h1>
        <p>
          Each piece tells a story of dedication, skill, and timeless artistry.
          Support independent artisans and bring unique treasures into your
          home.
        </p>
        <button className="btn-primary">Explore Collection</button>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section" id="shop">
        <div className="featured-container">
          {/* Sidebar Filter */}
          <aside className="featured-sidebar">
            <h3 className="filter-title">Filter by Category</h3>
            <div className="filter-group">
              {categories.map((category) => (
                <label key={category}>
                  <input type="checkbox" />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="featured-content">
            <div className="featured-header">
              <h2>Featured Products</h2>
              <span className="item-count">{products.length} items</span>
            </div>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-image">Image</div>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Spotlight Section */}
      <section className="artisan-section" id="artisans">
        <div className="artisan-container">
          <div className="artisan-header">
            <h2>Artisan Spotlight</h2>
            <p>Meet the creators behind the custom craftsmanship.</p>
          </div>
          <div className="artisan-content">
            <div className="artisan-image">Photo</div>
            <div className="artisan-bio">
              <h3>Oribi Teo-Iyalla</h3>
              <p>
                Specializing in handcrafted sustainable woodwork and custom
                jewelry design. Every piece in this collection tells a story of
                dedicated patience, sourcing raw local elements, and preserving
                functional master craftsmanship for everyday environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>
          &copy; {new Date().getFullYear()} Artisan Collective Marketplace. All
          rights reserved.
        </p>
      </footer>
    </>
  );
}
