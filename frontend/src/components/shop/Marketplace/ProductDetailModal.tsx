import React, { useState } from 'react';
import type { Product, ProductVariant, EmiPlan } from '../../../types';
import { EMICalculator } from './EMICalculator';
import { X, Star, ArrowRight, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onProceedCheckout: (variant: ProductVariant, plan: EmiPlan) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onProceedCheckout
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: 'default',
      name: 'Standard',
      color: 'Default',
      colorHex: '#5B46F6',
      storage: 'Standard',
      priceOffset: 0,
      image: product.primaryImage,
      inStock: true
    }
  );

  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null);

  const currentPrice = product.basePrice + (selectedVariant ? selectedVariant.priceOffset : 0);
  const currentOriginalPrice = product.originalPrice + (selectedVariant ? selectedVariant.priceOffset : 0);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#5B46F6', textTransform: 'uppercase' }}>
            {product.brand} • 1Fi Marketplace
          </span>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', textAlign: 'center', position: 'relative' }}>
            <img
              src={selectedVariant.image || product.primaryImage}
              alt={product.title}
              style={{ maxHeight: '220px', maxWidth: '100%', objectFit: 'contain' }}
            />
            {product.badge && <div className="badge-tag" style={{ top: '12px', left: '12px' }}>{product.badge}</div>}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{product.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FEF3C7', color: '#D97706', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                <Star size={13} fill="#D97706" />
                <span>{product.rating}</span>
              </div>
            </div>

            <div className="price-row" style={{ marginTop: '8px' }}>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>{formatCurrency(currentPrice)}</span>
              {currentOriginalPrice > currentPrice && (
                <span className="original-price" style={{ fontSize: '13px' }}>{formatCurrency(currentOriginalPrice)}</span>
              )}
            </div>
          </div>

          {product.variants && product.variants.length > 1 && (
            <div className="variant-section">
              <div className="variant-label">Select Variant / Storage</div>
              <div className="swatch-group">
                {product.variants.map(v => {
                  const isSel = selectedVariant.id === v.id;
                  return (
                    <div
                      key={v.id}
                      className={`swatch-item ${isSel ? 'selected' : ''}`}
                      onClick={() => setSelectedVariant(v)}
                    >
                      {v.colorHex && <div className="color-dot" style={{ backgroundColor: v.colorHex }} />}
                      <span>{v.name}</span>
                      {isSel && <Check size={14} color="#5B46F6" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {product.specs && (
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase' }}>
                Key Specifications
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '12px' }}>
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key}>
                    <span style={{ color: '#94A3B8' }}>{key}: </span>
                    <strong style={{ color: '#0F172A' }}>{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          <EMICalculator
            price={currentPrice}
            isNoCostAvailable={product.isNoCostEmiAvailable}
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
          />

          <div style={{ position: 'sticky', bottom: 0, background: '#FFFFFF', paddingTop: '12px', borderTop: '1px solid #E2E8F0', marginTop: '10px' }}>
            <button
              className="btn-primary"
              disabled={!selectedPlan}
              onClick={() => selectedPlan && onProceedCheckout(selectedVariant, selectedPlan)}
            >
              <span>
                {selectedPlan
                  ? `Proceed with ${selectedPlan.tenureMonths}-Mo EMI (${formatCurrency(selectedPlan.monthlyAmount)}/mo)`
                  : 'Select an EMI Plan'}
              </span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
