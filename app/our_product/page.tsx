"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  tag: string;
  image: string;
  accent: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: "Organic Turmeric Face Mask",
    price: 14.99,
    category: "Face Care",
    inStock: true,
    tag: "Best Seller",
    image: "/product.png",
    accent: "#F5A623",
  },
  {
    id: 2,
    name: "Herbal Neem Face Wash",
    price: 12.49,
    category: "Face Care",
    inStock: true,
    tag: "Natural",
    image: "/product.png",
    accent: "#6BAE75",
  },
  {
    id: 3,
    name: "Herbal Hair Oil",
    price: 15.99,
    category: "Hair Care",
    inStock: true,
    tag: "New",
    image: "/product_img/oilImg2.png",
    accent: "#A8C96E",
  },
  {
    id: 4,
    name: "Natural Rose Water Toner",
    price: 8.99,
    category: "Face Care",
    inStock: true,
    tag: "Popular",
    image: "/product.png",
    accent: "#E8A0B0",
  },
  {
    id: 5,
    name: "Herbal Aloe Vera Gel",
    price: 10.99,
    category: "Skin Care",
    inStock: true,
    tag: "Soothing",
    image: "/product.png",
    accent: "#74C69D",
  },
  {
    id: 6,
    name: "Oil Gone - Hair Solution",
    price: 18.99,
    category: "Hair Care",
    inStock: true,
    tag: "Featured",
    image: "/product_img/oilImgone.mp4",
    accent: "#D4A574",
  },
];

const CATEGORIES = ["All Products", "Face Care", "Hair Care", "Skin Care"];

// ─── Sub-components ───────────────────────────────────────────────────────────

import Image from 'next/image';
function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const isVideo = product.image.endsWith(".mp4") || product.image.endsWith(".webm") || product.image.endsWith(".mov");

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="card">
      <div className="card-img-wrap">
        {isVideo ? (
            <video
              src={product.image}
              className="product-media"
             muted
             loop
             playsInline
             autoPlay
           />
        ) : (
          <Image
            src={product.image}
            // alt={product.name}
            fill
            className="product-media"
          />
        )}
        <span className="card-tag">{product.tag}</span>
        <span className={`stock-badge ${product.inStock ? "in" : "out"}`}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-price">${product.price.toFixed(2)}</p>

        <div className="card-actions">
          <button
            className={`btn-cart ${added ? "added" : ""}`}
            onClick={handleAddToCart}
          >
            <span>{added ? "✓ Added!" : "+ Add to Cart"}</span>
          </button>
          <button className="btn-view">
            View Product <span className="arrow">→</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .card {
          background: #ffffff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(60, 100, 60, 0.07);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(60, 100, 60, 0.13);
        }
        .card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .card-img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--accent) 30%, #d4edda),
            color-mix(in srgb, var(--accent) 60%, #a8d5b5)
          );
        }
        .product-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          color: #2d6a4f;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .stock-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .stock-badge.in {
          background: rgba(40, 167, 69, 0.15);
          color: #1a7a3c;
        }
        .stock-badge.out {
          background: rgba(220, 53, 69, 0.12);
          color: #b02030;
        }
        .card-body {
          padding: 18px 18px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .card-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #1c3829;
          line-height: 1.35;
          margin: 0;
        }
        .card-price {
          font-size: 1.15rem;
          font-weight: 700;
          color: #2d6a4f;
          margin: 2px 0 10px;
          font-variant-numeric: tabular-nums;
        }
        .card-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: auto;
        }
        .btn-cart {
          background: #2d6a4f;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }
        .btn-cart:hover {
          background: #1a4a35;
          transform: scale(1.02);
        }
        .btn-cart.added {
          background: #52b788;
        }
        .btn-view {
          background: transparent;
          color: #2d6a4f;
          border: 1.5px solid #b7dcc8;
          border-radius: 10px;
          padding: 9px 16px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-view:hover {
          background: #f0faf4;
          border-color: #2d6a4f;
        }
        .arrow {
          transition: transform 0.2s;
        }
        .btn-view:hover .arrow {
          transform: translateX(4px);
        }

        /* Responsive adjustments for ProductCard */
        @media (max-width: 768px) {
          .card-tag {
            font-size: 10px;
            padding: 3px 8px;
            top: 10px;
            left: 10px;
          }
          .stock-badge {
            font-size: 10px;
            padding: 3px 8px;
            top: 10px;
            right: 10px;
          }
          .card-title {
            font-size: 0.95rem;
          }
          .card-price {
            font-size: 1.05rem;
          }
          .btn-cart, .btn-view {
            font-size: 12px;
            padding: 8px 12px;
          }
        }

        @media (max-width: 480px) {
          .card-tag {
            font-size: 9px;
            padding: 2px 6px;
          }
          .stock-badge {
            font-size: 9px;
            padding: 2px 6px;
          }
          .card-body {
            padding: 14px 14px 16px;
          }
          .card-title {
            font-size: 0.9rem;
          }
          .card-price {
            font-size: 1rem;
          }
          .btn-cart, .btn-view {
            font-size: 11px;
            padding: 7px 10px;
          }
        }
      `}</style>
    </div>
  );
}

function FilterSidebar({ priceRange, setPriceRange, availability, setAvailability, onClear }: {
  priceRange: number;
  setPriceRange: (value: number) => void;
  availability: string;
  setAvailability: (value: string) => void;
  onClear: () => void;
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="filter-icon">⚙</span>
        <h2>Filters</h2>
        <button className="clear-btn" onClick={onClear}>
          Clear all
        </button>
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <label className="filter-label">Price Range</label>
        <input
          type="range"
          min={0}
          max={50}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="price-slider"
        />
        <div className="price-labels">
          <span>$0</span>
          <span>${priceRange}</span>
        </div>
      </div>

      {/* Availability */}
      <div className="filter-group">
        <label className="filter-label">Availability</label>
        <div className="avail-buttons">
          {["All", "In Stock", "Out of Stock", "Limited Stock"].map((opt) => (
            <button
              key={opt}
              className={`avail-btn ${availability === opt ? "active" : ""}`}
              onClick={() => setAvailability(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 220px;
          min-width: 200px;
          background: #fff;
          border-radius: 18px;
          padding: 24px 18px;
          box-shadow: 0 2px 12px rgba(60, 100, 60, 0.07);
          align-self: flex-start;
          position: sticky;
          top: 24px;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 22px;
        }
        .filter-icon {
          font-size: 16px;
          color: #2d6a4f;
        }
        .sidebar-header h2 {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #1c3829;
          margin: 0;
          flex: 1;
        }
        .clear-btn {
          background: none;
          border: none;
          color: #52b788;
          font-size: 12px;
          cursor: pointer;
          padding: 2px 6px;
          border-radius: 6px;
          transition: background 0.15s;
        }
        .clear-btn:hover {
          background: #f0faf4;
        }
        .filter-group {
          margin-bottom: 22px;
        }
        .filter-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6b9e82;
          margin-bottom: 12px;
        }
        .price-slider {
          width: 100%;
          accent-color: #2d6a4f;
          cursor: pointer;
        }
        .price-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #4a7c5e;
          margin-top: 6px;
          font-weight: 600;
        }
        .avail-buttons {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .avail-btn {
          padding: 7px 12px;
          border-radius: 8px;
          border: 1.5px solid #d4edda;
          background: transparent;
          color: #2d6a4f;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
        }
        .avail-btn:hover {
          background: #f0faf4;
          border-color: #52b788;
        }
        .avail-btn.active {
          background: #2d6a4f;
          border-color: #2d6a4f;
          color: #fff;
          font-weight: 600;
        }
      `}</style>
    </aside>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [priceRange, setPriceRange] = useState(50);
  const [availability, setAvailability] = useState("All");

  const filtered = PRODUCTS.filter((p) => {
    const catMatch =
      activeCategory === "All Products" || p.category === activeCategory;
    const priceMatch = p.price <= priceRange;
    const availMatch =
      availability === "All" ||
      (availability === "In Stock" && p.inStock) ||
      (availability === "Out of Stock" && !p.inStock);
    return catMatch && priceMatch && availMatch;
  });

  const handleClear = () => {
    setActiveCategory("All Products");
    setPriceRange(50);
    setAvailability("All");
  };

  return (
    <div className="page">
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      {/* Category Bar */}
      <nav className="category-bar">
        <span className="cat-label">SHOP BY CATEGORY</span>
        <div className="cat-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Layout */}
      <div className="layout">
        <FilterSidebar
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          availability={availability}
          setAvailability={setAvailability}
          onClear={handleClear}
        />

        <main className="main">
          <p className="result-count">
            🌿 Showing <strong>{filtered.length}</strong> product
            {filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid">
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="empty-state">
                <span>🌱</span>
                <p>No products match your filters.</p>
                <button className="clear-all-btn" onClick={handleClear}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <style jsx>{`
        .page {
          font-family: "DM Sans", sans-serif;
          min-height: 100vh;
          background: #f4faf6;
          color: #1c3829;
        }

        /* ─ Category Bar ─ */
        .category-bar {
          padding: 16px 40px;
          background: #fff;
          border-bottom: 1px solid #e0f0e6;
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .cat-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #7ab898;
        }
        .cat-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cat-pill {
          padding: 6px 18px;
          border-radius: 20px;
          border: 1.5px solid #c8e6d4;
          background: transparent;
          color: #2d6a4f;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          font-family: "DM Sans", sans-serif;
          transition: all 0.18s;
        }
        .cat-pill:hover {
          background: #e8f5ed;
        }
        .cat-pill.active {
          background: #2d6a4f;
          border-color: #2d6a4f;
          color: #fff;
          font-weight: 600;
        }

        /* ─ Layout ─ */
        .layout {
          display: flex;
          gap: 28px;
          padding: 32px 40px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: flex-start;
        }

        /* ─ Main Content ─ */
        .main {
          flex: 1;
          min-width: 0;
        }
        .result-count {
          font-size: 13px;
          color: #5a8c6e;
          margin: 0 0 20px;
          font-weight: 500;
        }
        .result-count strong {
          color: #2d6a4f;
          font-weight: 700;
        }

         /* ─ Grid ─ */
         .grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr));
           gap: 22px;
         }

         /* ─ Empty State ─ */
         .empty-state {
           grid-column: 1 / -1;
           text-align: center;
           padding: 60px 20px;
           color: #5a8c6e;
         }
         .empty-state span {
           font-size: 48px;
           display: block;
           margin-bottom: 12px;
         }
         .empty-state p {
           font-size: 16px;
           margin-bottom: 20px;
         }
         .clear-all-btn {
           background: #2d6a4f;
           color: #fff;
           border: none;
           border-radius: 10px;
           padding: 10px 24px;
           font-size: 14px;
           font-weight: 600;
           cursor: pointer;
           font-family: "DM Sans", sans-serif;
           transition: background 0.2s;
         }
         .clear-all-btn:hover {
           background: #1a4a35;
         }

         /* ─ Responsive ─ */
         @media (max-width: 1024px) {
           .grid {
             grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
             gap: 18px;
           }
         }

         @media (max-width: 768px) {
           .layout {
             flex-direction: column;
             padding: 20px 16px;
           }
           .category-bar {
             padding: 12px 16px;
           }
           .sidebar {
             width: 100% !important;
             position: static !important;
           }
           .grid {
             grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));
             gap: 14px;
           }
           .card-img-wrap {
             aspect-ratio: 4/3;
           }
         }

         @media (max-width: 480px) {
           .grid {
             grid-template-columns: repeat(2, 1fr);
             gap: 10px;
           }
           .card-body {
             padding: 12px 12px 14px;
           }
           .card-title {
             font-size: 0.9rem;
           }
           .card-price {
             font-size: 1rem;
           }
           .card-actions {
             gap: 6px;
           }
           .btn-cart, .btn-view {
             font-size: 11px;
             padding: 7px 10px;
           }
         }
      `}</style>
    </div>
  );
}