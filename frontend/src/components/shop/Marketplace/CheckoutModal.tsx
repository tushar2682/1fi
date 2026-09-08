import React, { useState } from 'react';
import type { Product, ProductVariant, EmiPlan, CheckoutResponse } from '../../../types';
import { applyEmiBooking } from '../../../services/api';
import { CheckCircle2, ShieldCheck, ArrowRight, X } from 'lucide-react';

interface CheckoutModalProps {
  product: Product;
  selectedVariant: ProductVariant;
  selectedPlan: EmiPlan;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  selectedVariant,
  selectedPlan,
  onClose,
  onSuccess
}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [confirmedData, setConfirmedData] = useState<CheckoutResponse | null>(null);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const handleConfirmOrder = async () => {
    setSubmitting(true);
    const result = await applyEmiBooking(product.id, selectedVariant.id, selectedPlan);
    setSubmitting(false);
    setConfirmedData(result);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="#5B46F6" />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
              {confirmedData ? 'Booking Confirmed!' : '1Fi EMI Checkout'}
            </h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {confirmedData ? (
            <div style={{ textAlign: 'center', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#ECFDF5',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle2 size={44} />
              </div>

              <div>
                <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>EMI Loan Approved!</h4>
                <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                  Booking ID: <strong style={{ color: '#5B46F6' }}>{confirmedData.bookingId}</strong>
                </p>
              </div>

              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', width: '100%', textAlign: 'left', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Product:</span>
                  <strong style={{ color: '#0F172A' }}>{product.title}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Variant:</span>
                  <span>{selectedVariant.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Monthly EMI:</span>
                  <strong style={{ color: '#10B981' }}>{formatCurrency(selectedPlan.monthlyAmount)}/mo x {selectedPlan.tenureMonths}m</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Approval Mode:</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Instant via MF Credit Line</span>
                </div>
              </div>

              <button className="btn-primary" onClick={onSuccess}>
                Return to Marketplace
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', gap: '14px', background: '#F8FAFC', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '12px' }}>
                <img src={selectedVariant.image || product.primaryImage} alt={product.title} style={{ width: '64px', height: '64px', objectFit: 'contain', borderRadius: '8px', background: '#FFF', padding: '4px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#5B46F6', textTransform: 'uppercase' }}>{product.brand}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{product.title}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{selectedVariant.name}</div>
                </div>
              </div>

              <div style={{ background: '#EEECFF', padding: '14px', borderRadius: '12px', border: '1px solid rgba(91,70,246,0.3)', marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#5B46F6', fontWeight: 700 }}>Selected 1Fi EMI Plan</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{formatCurrency(selectedPlan.monthlyAmount)} <span style={{ fontSize: '12px', fontWeight: 500 }}>/ mo</span></div>
                    <div style={{ fontSize: '12px', color: '#475569' }}>Tenure: {selectedPlan.tenureMonths} Months ({selectedPlan.isNoCost ? '0% No Cost' : `${selectedPlan.interestRate}% APR`})</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Total Payable</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#5B46F6' }}>{formatCurrency(selectedPlan.totalPayable)}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#ECFDF5', border: '1px solid #10B981', padding: '12px', borderRadius: '12px', fontSize: '12px', color: '#065F46', marginBottom: '16px' }}>
                <ShieldCheck size={18} style={{ marginTop: '2px' }} />
                <div>
                  <strong>1Fi Mutual Fund Credit Limit Pre-Approved!</strong>
                  <div style={{ fontSize: '11px', marginTop: '2px', color: '#047857' }}>
                    No collateral paperwork required. Your loan is backed by your existing Mutual Fund investments.
                  </div>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={handleConfirmOrder}
                disabled={submitting}
              >
                {submitting ? 'Processing 1Fi Loan...' : `Confirm & Pay ${formatCurrency(selectedPlan.monthlyAmount)}/mo`}
                {!submitting && <ArrowRight size={18} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
