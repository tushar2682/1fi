import React from 'react';
import { Home, CreditCard, ShoppingBag, PieChart, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <div className="nav-item">
        <Home size={20} />
        <span>Home</span>
      </div>
      <div className="nav-item">
        <CreditCard size={20} />
        <span>MF Credit</span>
      </div>
      <div className="nav-item active">
        <ShoppingBag size={20} />
        <span>Shop</span>
      </div>
      <div className="nav-item">
        <PieChart size={20} />
        <span>Portfolio</span>
      </div>
      <div className="nav-item">
        <User size={20} />
        <span>Account</span>
      </div>
    </nav>
  );
};
