import React, { useState, useEffect } from 'react';
import type { Product, FilterOptions } from '../../../types';
import { fetchProducts } from '../../../services/api';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, Sparkles, RefreshCw } from 'lucide-react';

interface MarketplaceHubProps {
  onSelectProduct: (product: Product) => void;
}

const CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Audio', 'Wearables'];
const BRANDS = ['All', 'Apple', 'Samsung', 'Sony', 'Dell'];

export const MarketplaceHub: React.FC<MarketplaceHubProps> = ({ onSelectProduct }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All',
    brand: 'All',
    search: '',
    minPrice: 0,
    maxPrice: 500000,
    sortBy: 'popular',
    noCostOnly: false
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);

  const loadData = () => {
    setLoading(true);
    fetchProducts(filters).then(res => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, [filters.category, filters.brand, filters.sortBy, filters.noCostOnly]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      loadData();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Search Bar & Filter Button */}
      <div className="search-filter-section">
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="search-input-wrapper" style={{ flex: 1 }}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products or brands..."
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            style={{
              padding: '0 14px',
              background: showFilterDrawer || filters.noCostOnly || filters.brand !== 'All' ? '#EEECFF' : '#F1F5F9',
              border: '1px solid',
              borderColor: showFilterDrawer || filters.noCostOnly ? '#5B46F6' : 'transparent',
              borderRadius: '12px',
              color: showFilterDrawer || filters.noCostOnly ? '#5B46F6' : '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '13px'
            }}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters Box */}
        {showFilterDrawer && (
          <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong style={{ color: '#0F172A' }}>Filter Products</strong>
              <button
                onClick={() => setFilters({ category: 'All', brand: 'All', search: '', minPrice: 0, maxPrice: 500000, sortBy: 'popular', noCostOnly: false })}
                style={{ background: 'none', border: 'none', color: '#5B46F6', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
              >
                Reset
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '2px' }}>Brand</label>
                <select
                  value={filters.brand}
                  onChange={e => setFilters({ ...filters, brand: e.target.value })}
                  style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                >
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '2px' }}>Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={e => setFilters({ ...filters, sortBy: e.target.value })}
                  style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                >
                  <option value="popular">Popularity</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">User Rating</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px' }}>
                <input
                  type="checkbox"
                  id="nocost-chk"
                  checked={filters.noCostOnly}
                  onChange={e => setFilters({ ...filters, noCostOnly: e.target.checked })}
                />
                <label htmlFor="nocost-chk" style={{ fontWeight: 700, color: '#047857', fontSize: '12px', cursor: 'pointer' }}>
                  No Cost EMI Only
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Categories Bar */}
        <div className="categories-scroll">
          {CATEGORIES.map(cat => (
            <div
              key={cat}
              className={`category-chip ${filters.category === cat ? 'active' : ''}`}
              onClick={() => setFilters({ ...filters, category: cat })}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Credit Line Offer Banner */}
      <div style={{ margin: '12px 16px 0 16px', background: 'linear-gradient(135deg, #EEECFF 0%, #E0E7FF 100%)', borderRadius: '14px', padding: '12px 16px', border: '1px solid rgba(91,70,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#4338CA', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={14} /> 1Fi Credit Privilege
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
            Zero processing fees and flexible EMI options backed by your mutual fund portfolio.
          </div>
        </div>
      </div>

      {/* Products */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748B', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <RefreshCw size={24} className="spin-loader" />
          <span>Loading products...</span>
        </div>
      ) : products.length === 0 ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>No products matched your search</h3>
          <p style={{ fontSize: '13px', marginTop: '4px' }}>Try adjusting your filters or category choice.</p>
          <button
            onClick={() => setFilters({ category: 'All', brand: 'All', search: '', minPrice: 0, maxPrice: 500000, sortBy: 'popular', noCostOnly: false })}
            style={{ marginTop: '12px', background: '#5B46F6', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};
