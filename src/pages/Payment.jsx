import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from '../components/QRCode';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { train, travelDate, selectedClass, price, passenger } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(60);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'accepted', 'rejected'
  const [showFailModal, setShowFailModal] = useState(false);

  // Generate unique transaction ID
  const transactionId = useMemo(() => {
    return `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  // Initialize transaction in localStorage
  useEffect(() => {
    if (train && transactionId) {
      const transactionData = {
        transactionId,
        train,
        travelDate,
        selectedClass,
        price,
        passenger,
        status: 'pending',
        createdAt: Date.now(),
      };
      localStorage.setItem(`payment_${transactionId}`, JSON.stringify(transactionData));
    }
  }, [train, transactionId, travelDate, selectedClass, price, passenger]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && paymentStatus === null) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, paymentStatus]);

  // Auto-fail when timer ends
  useEffect(() => {
    if (timeLeft === 0 && paymentStatus === null) {
      setPaymentStatus('rejected');
      setShowFailModal(true);
    }
  }, [timeLeft, paymentStatus]);

  // Poll for payment status from localStorage
  useEffect(() => {
    if (!transactionId || paymentStatus !== null) return;

    const pollInterval = setInterval(() => {
      const stored = localStorage.getItem(`payment_${transactionId}`);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.status === 'accepted' || data.status === 'rejected') {
          setPaymentStatus(data.status);
          clearInterval(pollInterval);
        }
      }
    }, 2000); // Poll every 2s

    return () => clearInterval(pollInterval);
  }, [transactionId, paymentStatus]);

  // Handle payment status changes
  useEffect(() => {
    if (paymentStatus === 'accepted') {
      // Navigate to success page
      setTimeout(() => {
        navigate('/success', {
          state: {
            train,
            travelDate,
            selectedClass,
            price,
            passenger,
          },
        });
      }, 1000);
    } else if (paymentStatus === 'rejected') {
      // Show rejection message (handled in render)
    }
  }, [paymentStatus, navigate, train, travelDate, selectedClass, price, passenger]);

  // Generate QR code URL (bridge route that marks accepted then redirects to portfolio)
  const qrCodeUrl = useMemo(() => {
    if (typeof window !== 'undefined' && transactionId) {
      return `${window.location.origin}/mobile-open/${transactionId}`;
    }
    return '';
  }, [transactionId]);

  if (!train || !passenger) {
    return (
      <div className="app-shell">
        <div className="card">
          <h2 className="card__title">Invalid booking data</h2>
          <p className="card__subtitle">Please start booking again.</p>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <button
          type="button"
          className="link-button"
          onClick={() => navigate('/booking', { state: { train, travelDate } })}
        >
          ← Back to Booking
        </button>
        <h1 className="app-title">Payment Gateway</h1>
        <p className="app-subtitle">Complete your payment to confirm booking</p>
      </header>

      <main className="app-shell__main">
        <div className="payment-layout">
          <section className="card">
            <h2 className="card__title">Booking Summary</h2>
            <div className="booking-summary">
              <div className="booking-summary__row">
                <span>Train:</span>
                <strong>{train.name} (#{train.number})</strong>
              </div>
              <div className="booking-summary__row">
                <span>Route:</span>
                <strong>{train.from} → {train.to}</strong>
              </div>
              <div className="booking-summary__row">
                <span>Date:</span>
                <strong>{travelDate}</strong>
              </div>
              <div className="booking-summary__row">
                <span>Class:</span>
                <strong>{selectedClass}</strong>
              </div>
              <div className="booking-summary__row">
                <span>Passenger:</span>
                <strong>{passenger.name}</strong>
              </div>
              <div className="booking-summary__row booking-summary__row--total">
                <span>Total Amount:</span>
                <strong className="price-large">₹{price.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </section>

          <section className="card payment-card">
            <h2 className="card__title">Scan QR to Approve</h2>
            <p className="card__subtitle">Scan with your phone to open the portfolio and auto-confirm</p>

            <div className="qr-container">
              <div className="qr-code">
                {qrCodeUrl && (
                  <QRCode
                    value={qrCodeUrl}
                    size={240}
                  />
                )}
                <p className="qr-label">Scan with your phone camera</p>
                <a
                  className="qr-open-link"
                  href={qrCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2563eb', fontWeight: 600, marginTop: '0.25rem', display: 'inline-block' }}
                >
                  Open on this device
                </a>
                <p className="qr-amount">Amount: ₹{price.toLocaleString('en-IN')}</p>
                <p className="qr-instruction">Opening the link on your phone will confirm payment</p>
              </div>
            </div>

            <div className="timer-container">
              <div className={`timer ${timeLeft <= 10 ? 'timer--warning' : ''} ${timeLeft === 0 ? 'timer--expired' : ''}`}>
                <span className="timer__label">Time Remaining:</span>
                <span className="timer__value">{timeLeft}s</span>
              </div>
              {timeLeft === 0 && (
                <p className="timer-message">Timer expired. You can proceed if payment is confirmed.</p>
              )}
            </div>

            <div className="payment-status-container">
              {paymentStatus === null && (
                <div className="payment-waiting">
                  <p className="payment-waiting__text">
                    Waiting for payment confirmation from your phone...
                  </p>
                  <div className="payment-waiting__spinner"></div>
                </div>
              )}
              {paymentStatus === 'accepted' && (
                <div className="payment-status payment-status--success">
                  <div className="payment-status__icon">✓</div>
                  <p className="payment-status__text">Payment accepted! Redirecting...</p>
                </div>
              )}
              {paymentStatus === 'rejected' && (
                <div className="payment-status payment-status--error">
                  <div className="payment-status__icon">✕</div>
                  <p className="payment-status__text">Payment failed or rejected</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/booking', { state: { train, travelDate } })}
                    style={{ marginTop: '1rem' }}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      {/* Failure Modal */}
      {showFailModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 440,
              background: '#ffffff',
              borderRadius: 16,
              padding: '1.5rem',
              boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 700,
                margin: '0 auto 0.75rem',
              }}
            >
              ✕
            </div>
            <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a' }}>
              Payment failed or not confirmed.
            </h3>
            <p style={{ margin: 0, color: '#475569' }}>
              The QR link wasn&apos;t opened within 60 seconds.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowFailModal(false);
                  navigate('/booking', { state: { train, travelDate } });
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
      </main>

    </div>
  );
}
