import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { ShopTabs, type ShopTabType } from './components/shop/ShopTabs';
import { TopBrandsTab } from './components/shop/TopBrandsTab';
import { NearbyStoresTab } from './components/shop/NearbyStoresTab';
import { MarketplaceHub } from './components/shop/Marketplace/MarketplaceHub';
import { ProductDetailModal } from './components/shop/Marketplace/ProductDetailModal';
import { CheckoutModal } from './components/shop/Marketplace/CheckoutModal';
import type { Product, ProductVariant, EmiPlan, UserCredit } from './types';
import { fetchUserCredit } from './services/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ShopTabType>('marketplace');
  const [wideMode, setWideMode] = useState<boolean>(false);
  const [userCredit, setUserCredit] = useState<UserCredit | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutState, setCheckoutState] = useState<{
    product: Product;
    variant: ProductVariant;
    plan: EmiPlan;
  } | null>(null);

  useEffect(() => {
    fetchUserCredit().then(data => setUserCredit(data));
  }, []);

  const handleProceedCheckout = (variant: ProductVariant, plan: EmiPlan) => {
    if (selectedProduct) {
      setCheckoutState({
        product: selectedProduct,
        variant,
        plan
      });
      setSelectedProduct(null);
    }
  };

  return (
    <div className={`app-canvas ${wideMode ? 'wide-mode' : ''}`}>
      <Header
        userCredit={userCredit}
        wideMode={wideMode}
        setWideMode={setWideMode}
      />

      <ShopTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'top_brands' && <TopBrandsTab />}
        {activeTab === 'nearby_stores' && <NearbyStoresTab />}
        {activeTab === 'marketplace' && (
          <MarketplaceHub onSelectProduct={setSelectedProduct} />
        )}
      </main>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onProceedCheckout={handleProceedCheckout}
        />
      )}

      {checkoutState && (
        <CheckoutModal
          product={checkoutState.product}
          selectedVariant={checkoutState.variant}
          selectedPlan={checkoutState.plan}
          onClose={() => setCheckoutState(null)}
          onSuccess={() => setCheckoutState(null)}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default App;
