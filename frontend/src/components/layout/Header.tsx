import React from 'react';
import type { UserCredit } from '../../types';
import { ShieldCheck, Bell } from 'lucide-react';

interface HeaderProps {
  userCredit: UserCredit | null;
  wideMode: boolean;
  setWideMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ userCredit, wideMode, setWideMode }) => {
  const formattedLimit = userCredit
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(userCredit.availableCreditLimit)
    : '₹1,50,000';

  return (
    <header className="onefi-header">
      <div className="onefi-top-bar">
        <div className="brand-logo">
          <span>1Fi</span>
          <span className="highlight">Marketplace</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setWideMode(!wideMode)}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFF',
              fontSize: '11px',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            {wideMode ? '📱 Mobile View' : '🖥️ Wide View'}
          </button>
          <Bell size={20} style={{ opacity: 0.9, cursor: 'pointer' }} />
        </div>
      </div>

      <div className="credit-limit-card">
        <div className="credit-limit-info">
          <div className="label">1Fi Mutual Fund Credit Limit</div>
          <div className="amount">{formattedLimit}</div>
        </div>
        <div className="credit-badge">
          <ShieldCheck size={14} />
          <span>0% Interest EMI</span>
        </div>
      </div>
    </header>
  );
};
