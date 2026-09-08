import React, { useState, useEffect } from 'react';
import type { EmiPlan } from '../../../types';
import { fetchEmiPlans } from '../../../services/api';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface EMICalculatorProps {
  price: number;
  isNoCostAvailable: boolean;
  selectedPlan: EmiPlan | null;
  onSelectPlan: (plan: EmiPlan) => void;
}

export const EMICalculator: React.FC<EMICalculatorProps> = ({
  price,
  isNoCostAvailable,
  selectedPlan,
  onSelectPlan
}) => {
  const [plans, setPlans] = useState<EmiPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchEmiPlans(price, isNoCostAvailable).then(data => {
      if (isMounted) {
        setPlans(data);
        if (data.length > 0 && !selectedPlan) {
          const defaultPlan = data.find(p => p.isNoCost) || data[0];
          onSelectPlan(defaultPlan);
        }
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [price, isNoCostAvailable]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
        Calculating 1Fi Mutual Fund Credit EMI plans...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Select 1Fi EMI Plan</h4>
        <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700, background: '#ECFDF5', padding: '3px 8px', borderRadius: '12px' }}>
          ₹0 Processing Fee
        </span>
      </div>

      <div className="emi-plans-container">
        {plans.map(plan => {
          const isSelected = selectedPlan?.tenureMonths === plan.tenureMonths;
          return (
            <div
              key={plan.tenureMonths}
              className={`emi-plan-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectPlan(plan)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: isSelected ? '6px solid #5B46F6' : '2px solid #CBD5E1',
                  background: '#FFF'
                }} />
                <div>
                  <div className="plan-tenure">{plan.tenureMonths} Months Plan</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    {plan.isNoCost ? (
                      <span style={{ color: '#10B981', fontWeight: 700 }}>0% Interest (No Cost EMI)</span>
                    ) : (
                      <span>{plan.interestRate}% p.a. via MF Credit Line</span>
                    )}
                  </div>
                  {plan.oneFiSavings > 0 && (
                    <div className="plan-savings-tag">
                      ✨ Save {formatCurrency(plan.oneFiSavings)} vs bank cards
                    </div>
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="plan-monthly">{formatCurrency(plan.monthlyAmount)}<span style={{ fontSize: '11px', fontWeight: 500 }}>/mo</span></div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>Total: {formatCurrency(plan.totalPayable)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedPlan && (
        <div style={{ background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div
            onClick={() => setShowBreakdown(!showBreakdown)}
            style={{
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 700,
              color: '#334155'
            }}
          >
            <span>View Payment & Fee Breakdown</span>
            {showBreakdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {showBreakdown && (
            <div style={{ padding: '0 16px 14px 16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Principal Amount</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{formatCurrency(price)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Interest Rate</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedPlan.isNoCost ? '0% (Subsidized)' : `${selectedPlan.interestRate}% p.a.`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Total Interest Charge</span>
                <span style={{ fontWeight: 600, color: selectedPlan.isNoCost ? '#10B981' : '#0F172A' }}>{formatCurrency(selectedPlan.totalInterest)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Processing Fee</span>
                <span style={{ fontWeight: 700, color: '#10B981' }}>FREE (1Fi Waived)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0F172A', fontWeight: 800, borderTop: '1px dashed #CBD5E1', paddingTop: '8px', marginTop: '4px' }}>
                <span>Total Payable Amount</span>
                <span style={{ color: '#5B46F6' }}>{formatCurrency(selectedPlan.totalPayable)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
