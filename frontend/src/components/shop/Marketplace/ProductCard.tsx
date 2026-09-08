import React from 'react';
import type { Product } from '../../../types';
import { Star, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const discountPct = Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100);

  const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.basePrice);
  const formattedOriginalPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.originalPrice);
  const formattedEmi = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.startingEmi);

  return (
    <div className="product-card" onClick={() => onSelect(product)}>
      <div className="product-card-image-wrap">
        {product.badge && <div className="badge-tag">{product.badge}</div>}
        <img src={product.primaryImage} alt={product.title} loading="lazy" />
      </div>

      <div className="product-card-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
          <span className="brand-label">{product.brand}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: 700, color: '#F59E0B' }}>
            <Star size={12} fill="#F59E0B" />
            <span>{product.rating}</span>
            <span style={{ color: '#94A3B8', fontWeight: 400 }}>({product.reviewsCount})</span>
          </div>
        </div>

        <h4 className="product-title">{product.title}</h4>

        <div className="price-row">
          <span className="current-price">{formattedPrice}</span>
          {product.originalPrice > product.basePrice && (
            <>
              <span className="original-price">{formattedOriginalPrice}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}>{discountPct}% OFF</span>
            </>
          )}
        </div>

        <div className="emi-tag-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={13} fill="#047857" />
            <span>EMI from {formattedEmi}/mo</span>
          </div>
          <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>1Fi Approved</span>
        </div>
      </div>
    </div>
  );
};
