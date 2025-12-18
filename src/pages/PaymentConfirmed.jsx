import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Callback page after portfolio visit
 * Confirms the payment was completed and redirects to success
 */
export default function PaymentConfirmed() {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!transactionId) {
      navigate('/dashboard');
      return;
    }

    // Retrieve transaction data and navigate to success
    const key = `payment_${transactionId}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.status === 'accepted') {
          // Navigate to success page with booking details
          setTimeout(() => {
            navigate('/success', {
              state: {
                train: data.train,
                travelDate: data.travelDate,
                selectedClass: data.selectedClass,
                price: data.price,
                passenger: data.passenger,
              },
            });
          }, 1500);
          return;
        }
      } catch (err) {
        console.error('Error parsing transaction:', err);
      }
    }

    // Fallback: redirect to dashboard if data not found
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  }, [transactionId, navigate]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: '#fff',
        padding: '1.5rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 16,
          padding: '2rem 1.5rem',
          maxWidth: 480,
          width: '100%',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: '#D1FAE5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 800,
            margin: '0 auto 1.25rem',
            animation: 'checkBounce 0.6s ease-out',
          }}
        >
          ✓
        </div>
        <h1 style={{ margin: '0 0 0.75rem', fontSize: '2rem' }}>
          Payment Successful!
        </h1>
        <p style={{ margin: 0, opacity: 0.95, fontSize: '1.05rem' }}>
          Thank you for visiting! Completing your booking...
        </p>
        <div
          style={{
            marginTop: '1.5rem',
            width: '100%',
            height: 4,
            background: 'rgba(255,255,255,0.3)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              background: '#fff',
              borderRadius: 2,
              animation: 'progressBar 1.5s ease-in-out',
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes checkBounce {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
