import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MobileConfirm.css';

export default function MobileConfirm() {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    // Load transaction data from localStorage
    const stored = localStorage.getItem(`payment_${transactionId}`);
    if (stored) {
      const data = JSON.parse(stored);
      setTransactionData(data);
      setStatus(data.status || 'pending');
    } else {
      // If transaction not found, redirect to error
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [transactionId, navigate]);

  function handleAccept() {
    if (!transactionId) return;
    
    // Update transaction status in localStorage
    const stored = localStorage.getItem(`payment_${transactionId}`);
    if (stored) {
      const data = JSON.parse(stored);
      data.status = 'accepted';
      data.updatedAt = Date.now();
      localStorage.setItem(`payment_${transactionId}`, JSON.stringify(data));
      setStatus('accepted');
      
      // Redirect to success page after a delay
      setTimeout(() => {
        navigate('/mobile-success', { state: { transactionId, accepted: true } });
      }, 1000);
    }
  }

  function handleReject() {
    if (!transactionId) return;
    
    // Update transaction status in localStorage
    const stored = localStorage.getItem(`payment_${transactionId}`);
    if (stored) {
      const data = JSON.parse(stored);
      data.status = 'rejected';
      data.updatedAt = Date.now();
      localStorage.setItem(`payment_${transactionId}`, JSON.stringify(data));
      setStatus('rejected');
      
      // Redirect to rejection page after a delay
      setTimeout(() => {
        navigate('/mobile-success', { state: { transactionId, accepted: false } });
      }, 1000);
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
              <span className="mobile-confirm__amount">₹{transactionData.price?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {status === 'pending' && (
            <div className="mobile-confirm__status" style={{ paddingTop: '0.5rem' }}>
              <p style={{ margin: 0, color: '#6b7280' }}>
                Please scan the QR from desktop to proceed.
              </p>
            </div>
          )}

          {status === 'accepted' && (
            <div className="mobile-confirm__status mobile-confirm__status--success">
              <div className="mobile-confirm__status-icon">✓</div>
              <p>Payment Accepted!</p>
            </div>
          )}

          {status === 'rejected' && (
            <div className="mobile-confirm__status mobile-confirm__status--error">
              <div className="mobile-confirm__status-icon">✕</div>
              <p>Payment Rejected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

