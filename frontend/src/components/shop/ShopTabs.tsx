import React from 'react';

export type ShopTabType = 'top_brands' | 'nearby_stores' | 'marketplace';

interface ShopTabsProps {
  activeTab: ShopTabType;
  setActiveTab: (tab: ShopTabType) => void;
}

export const ShopTabs: React.FC<ShopTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="shop-tabs-bar">
      <div
        className={`shop-tab-item ${activeTab === 'top_brands' ? 'active' : ''}`}
        onClick={() => setActiveTab('top_brands')}
      >
        Top Brands
      </div>
      <div
        className={`shop-tab-item ${activeTab === 'nearby_stores' ? 'active' : ''}`}
        onClick={() => setActiveTab('nearby_stores')}
      >
        Nearby Stores
      </div>
      <div
        className={`shop-tab-item ${activeTab === 'marketplace' ? 'active' : ''}`}
        onClick={() => setActiveTab('marketplace')}
      >
        1Fi Marketplace
      </div>
    </div>
  );
};
