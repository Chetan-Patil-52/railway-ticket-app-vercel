import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Bridge page:
 * - Marks the transaction as accepted in localStorage (frontend-only simulation)
 * - For cross-device scenarios, uses the portfolio redirect with callback
 * - Then redirects the user to the portfolio URL
 */
export default function MobileOpen() {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!transactionId) {
      navigate('/');
      return;
    }

    // Try to mark as accepted in localStorage
    try {
      const key = `payment_${transactionId}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        const data = JSON.parse(stored);
        data.status = 'accepted';
        data.updatedAt = Date.now();
        localStorage.setItem(key, JSON.stringify(data));
      } else {
        // Create accepted flag even if transaction data missing
        localStorage.setItem(
          key,
          JSON.stringify({
            transactionId,
            status: 'accepted',
            updatedAt: Date.now(),
          }),
        );
      }
    } catch (err) {
      console.warn('localStorage not available:', err);
    }

    // For cross-device scenarios: send confirmation via query param
    // The desktop Payment page can poll for this or use BroadcastChannel API
    try {
      // Store in sessionStorage with a timestamp for polling detection
      sessionStorage.setItem(
        `payment_confirmed_${transactionId}`,
        JSON.stringify({ confirmed: true, timestamp: Date.now() })
      );
    } catch (err) {
      console.warn('sessionStorage not available:', err);
    }

    // Create callback URL that returns to success confirmation
    const returnUrl = `${window.location.origin}/payment-confirmed/${transactionId}`;
    const portfolioUrl = `https://chetanpatil.vercel.app?from=railconnect&txn=${encodeURIComponent(
      transactionId
    )}&return=${encodeURIComponent(returnUrl)}`;

    // Redirect to portfolio after showing confirmation
    const timer = setTimeout(() => {
      window.location.replace(portfolioUrl);
    }, 1200);

    return () => clearTimeout(timer);
  }, [transactionId, navigate]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
        color: '#fff',
        padding: '1.5rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 16,
          padding: '1.5rem 1.25rem',
          maxWidth: 520,
          width: '100%',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#DBEAFE',
            color: '#1e40af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 800,
            margin: '0 auto 1rem',
            animation: 'scaleIn 0.4s ease-out',
          }}
        >
          ✓
        </div>
        <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem' }}>Payment Confirmed!</h1>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem' }}>
          Redirecting to portfolio…
        </p>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
