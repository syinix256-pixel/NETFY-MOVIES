'use client';

import { useState } from 'react';
import { SUBSCRIPTION_PLANS, MOBILE_MONEY_NUMBERS } from '@/lib/types';
import { useApp } from '@/lib/AppContext';
import Link from 'next/link';

export default function SubscriptionPage() {
  const { user, isAuthenticated, purchaseSubscription } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      setSelectedPlan(planId);
      setShowPaymentModal(true);
      return;
    }
    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    // In a real app, this would integrate with a payment gateway
    // For demo purposes, we'll simulate successful payment
    setPaymentSuccess(true);
    
    if (selectedPlan) {
      purchaseSubscription(selectedPlan as 'weekly' | 'monthly');
    }

    // Reset after showing success
    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentSuccess(false);
      setSelectedPlan(null);
    }, 3000);
  };

  const selectedPlanDetails = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan);

  return (
    <div style={{ 
      background: 'var(--background)', 
      minHeight: '100vh',
      paddingTop: '20px'
    }}>
      {/* Header */}
      <div style={{ padding: '0 20px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: 'var(--text-primary)',
          marginBottom: '12px'
        }}>
          Go <span style={{ color: '#E50914' }}>Premium</span>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Unlock unlimited movies and exclusive features
        </p>
      </div>

      {/* Current Plan Status */}
      {isAuthenticated && user?.isPremium && (
        <div style={{ padding: '0 20px', marginBottom: '24px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #F5C518 0%, #FF6B00 100%)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '14px', color: '#000', marginBottom: '4px' }}>★ You&apos;re a Premium Member</p>
            <p style={{ fontSize: '12px', color: '#333' }}>
              {user.subscriptionExpiry && `Expires: ${new Date(user.subscriptionExpiry).toLocaleDateString()}`}
            </p>
          </div>
        </div>
      )}

      {/* Plans */}
      <div style={{ padding: '0 20px' }}>
        {SUBSCRIPTION_PLANS.map((plan, index) => (
          <div 
            key={plan.id}
            style={{
              background: 'var(--surface)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '16px',
              border: user?.isPremium && plan.id === (user.subscriptionType || 'weekly') ? '2px solid #F5C518' : '2px solid transparent',
              animation: 'fadeIn 0.5s ease-out',
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Plan Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Valid for {plan.duration}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#E50914' }}>
                  UGX {plan.price.toLocaleString()}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {plan.id === 'weekly' ? 'per week' : 'per month'}
                </p>
              </div>
            </div>

            {/* Features */}
            <ul style={{ marginBottom: '20px' }}>
              {plan.features.map((feature, i) => (
                <li 
                  key={i}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    fontSize: '14px', 
                    color: 'var(--text-secondary)',
                    marginBottom: '10px'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#46D369">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Subscribe Button */}
            <button
              onClick={() => handleSelectPlan(plan.id)}
              className="no-select"
              disabled={user?.isPremium && plan.id === (user.subscriptionType || 'weekly')}
              style={{
                width: '100%',
                padding: '14px',
                background: user?.isPremium && plan.id === (user.subscriptionType || 'weekly') 
                  ? 'var(--surface-elevated)' 
                  : 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
                border: 'none',
                borderRadius: '8px',
                color: user?.isPremium && plan.id === (user.subscriptionType || 'weekly') 
                  ? 'var(--text-secondary)' 
                  : 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: user?.isPremium && plan.id === (user.subscriptionType || 'weekly') 
                  ? 'not-allowed' 
                  : 'pointer'
              }}
            >
              {user?.isPremium && plan.id === (user.subscriptionType || 'weekly')
                ? 'Current Plan'
                : user?.isPremium
                  ? 'Switch Plan'
                  : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      {/* Pay Per View Info */}
      <div style={{ padding: '20px' }}>
        <div style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            💰 Pay Per View
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Don&apos;t want a subscription? You can also rent individual movies for just 
            <strong style={{ color: '#E50914' }}> UGX 500</strong> each.
          </p>
          <Link 
            href="/browse"
            className="no-select"
            style={{
              display: 'inline-block',
              marginTop: '12px',
              color: '#E50914',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Browse Movies →
          </Link>
        </div>
      </div>

      {/* Mobile Money Info */}
      <div style={{ padding: '0 20px 40px' }}>
        <div style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            📱 How to Pay
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Pay via Mobile Money to:
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {MOBILE_MONEY_NUMBERS.map((number, i) => (
              <div 
                key={i}
                style={{
                  background: 'var(--surface-elevated)',
                  padding: '8px 16px',
                  borderRadius: '8px'
                }}
              >
                <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600' }}>
                  {number}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px' }}>
            After payment, your subscription will be activated automatically
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {paymentSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#46D369',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  animation: 'pulse 1s infinite'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Payment Successful!
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Welcome to Premium
                </p>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '20px', textAlign: 'center' }}>
                  Complete Payment
                </h2>

                {selectedPlanDetails && (
                  <div style={{ 
                    background: 'var(--surface-elevated)', 
                    borderRadius: '12px', 
                    padding: '16px',
                    marginBottom: '20px'
                  }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Plan</p>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {selectedPlanDetails.name}
                    </p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#E50914', marginTop: '8px' }}>
                      UGX {selectedPlanDetails.price.toLocaleString()}
                    </p>
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px' }}>
                    Pay to one of these numbers:
                  </p>
                  {MOBILE_MONEY_NUMBERS.map((number, i) => (
                    <div 
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        background: 'var(--surface-elevated)',
                        borderRadius: '8px',
                        marginBottom: '8px'
                      }}
                    >
                      <span style={{ fontSize: '16px', color: 'var(--text-primary)', fontWeight: '600' }}>
                        {number}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>MTN / Airtel</span>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '20px' }}>
                  After payment, click the button below to activate your subscription
                </p>

                <button
                  onClick={handlePayment}
                  className="no-select"
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#E50914',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  I Have Paid - Activate
                </button>

                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="no-select"
                  style={{
                    width: '100%',
                    marginTop: '12px',
                    padding: '12px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom padding for nav */}
      <div style={{ height: '40px' }} />
    </div>
  );
}
