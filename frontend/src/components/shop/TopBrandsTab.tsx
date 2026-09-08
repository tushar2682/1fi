import React from 'react';
import { Store } from 'lucide-react';

export const TopBrandsTab: React.FC = () => {
  return (
    <div className="placeholder-tab-view">
      <div className="placeholder-icon-wrap">
        <Store size={32} />
      </div>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Top Brand Offers</h3>
      <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '280px', lineHeight: 1.4 }}>
        Exclusive partner brand discounts will appear here. Switch to <strong>1Fi Marketplace</strong> to browse available products.
      </p>
    </div>
  );
};
