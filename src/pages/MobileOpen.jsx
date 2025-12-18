import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MobileConfirm.css';

/**
 * Simple mobile payment confirmation page
 * Shows Approve/Decline buttons
 * Updates localStorage for desktop polling
 */
export default function MobileOpen() {
  const { transactionId } = useParams();
  const [transactionData, setTransactionData] = useState(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    // Load transaction data from localStorage
    const stored = localStorage.getItem(`payment_${transactionId}`);
    if (stored) {
      const data = JSON.parse(stored);
      setTransactionData(data);
      setStatus(data.status || 'pending');
    }
  }, [transactionId]);

  function handleApprove() {
    if (!transactionId) return;

    // Update transaction status in localStorage
    const stored = localStorage.getItem(`payment_${transactionId}`);
    if (stored) {
      const data = JSON.parse(stored);
      data.status = 'accepted';
      data.updatedAt = Date.now();
      localStorage.setItem(`payment_${transactionId}`, JSON.stringify(data));
      setStatus('accepted');
    }
  }

  function handleDecline() {
    if (!transactionId) return;

    // Update transaction status in localStorage
    const stored = localStorage.getItem(`payment_${transactionId}`);
    if (stored) {
      const data = JSON.parse(stored);
      data.status = 'rejected';
      data.updatedAt = Date.now();
      localStorage.setItem(`payment_${transactionId}`, JSON.stringify(data));
      setStatus('rejected');
    }
  }

  if (!transactionData) {
    return (
      <div className="mobile-confirm">
        <div className="mobile-confirm__loading">
          <p>Loading transaction...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-confirm">
      <div className="mobile-confirm__container">
        <div className="mobile-confirm__header">
          <h1 className="mobile-confirm__title">Confirm Payment</h1>
          <p className="mobile-confirm__subtitle">RailConnect Ticket Booking</p>
        </div>

        <div className="mobile-confirm__card">
          <div className="mobile-confirm__details">
            <div className="mobile-confirm__detail-row">
              <span className="mobile-confirm__label">Train:</span>
              <span className="mobile-confirm__value">{transactionData.train?.name}</span>
            </div>
            <div className="mobile-confirm__detail-row">
              <span className="mobile-confirm__label">Route:</span>
              <span className="mobile-confirm__value">
                {transactionData.train?.from} → {transactionData.train?.to}
              </span>
            </div>
            <div className="mobile-confirm__detail-row">
              <span className="mobile-confirm__label">Date:</span>
              <span className="mobile-confirm__value">{transactionData.travelDate}</span>
            </div>
            <div className="mobile-confirm__detail-row">
              <span className="mobile-confirm__label">Class:</span>
              <span className="mobile-confirm__value">{transactionData.selectedClass}</span>
            </div>
            <div className="mobile-confirm__detail-row mobile-confirm__detail-row--amount">
              <span className="mobile-confirm__label">Amount:</span>
              <span className="mobile-confirm__amount">
                ₹{transactionData.price?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {status === 'pending' && (
            <div className="mobile-confirm__actions">
              <button
                className="mobile-confirm__btn mobile-confirm__btn--accept"
                onClick={handleApprove}
              >
                <span className="mobile-confirm__btn-icon">✓</span>
                Approve Payment
              </button>
              <button
                className="mobile-confirm__btn mobile-confirm__btn--reject"
                onClick={handleDecline}
              >
                <span className="mobile-confirm__btn-icon">✕</span>
                Decline Payment
              </button>
            </div>
          )}

          {status === 'accepted' && (
            <div className="mobile-confirm__status mobile-confirm__status--success">
              <div className="mobile-confirm__status-icon">✓</div>
              <p>Payment Approved!</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
                Check your desktop for ticket confirmation
              </p>
            </div>
          )}

          {status === 'rejected' && (
            <div className="mobile-confirm__status mobile-confirm__status--error">
              <div className="mobile-confirm__status-icon">✕</div>
              <p>Payment Declined</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
