import { useLocation } from 'react-router-dom';
import './MobileConfirm.css';

export default function MobileSuccess() {
  const location = useLocation();
  const { accepted } = location.state || {};

  return (
    <div className="mobile-confirm">
      <div className="mobile-confirm__container">
        <div className="mobile-confirm__card">
          {accepted ? (
            <div className="mobile-confirm__status mobile-confirm__status--success">
              <div className="mobile-confirm__status-icon">✓</div>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', color: '#059669' }}>
                Payment Successful!
              </h2>
              <p style={{ margin: 0, color: '#6b7280' }}>
                Your payment has been confirmed. You can close this page.
              </p>
            </div>
          ) : (
            <div className="mobile-confirm__status mobile-confirm__status--error">
              <div className="mobile-confirm__status-icon">✕</div>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', color: '#dc2626' }}>
                Payment Rejected
              </h2>
              <p style={{ margin: 0, color: '#6b7280' }}>
                The payment was rejected. You can close this page.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

