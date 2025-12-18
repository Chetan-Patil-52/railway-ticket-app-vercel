import { useLocation, useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const { train, travelDate, selectedClass, price, passenger } = location.state || {};

  if (!train || !passenger) {
    return (
      <div className="app-shell">
        <div className="card">
          <h2 className="card__title">Invalid booking</h2>
          <p className="card__subtitle">Please start a new booking.</p>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Generate a mock PNR number
  const pnrNumber = `PNR${Math.random().toString().substring(2, 11)}`;

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon-large">✓</div>
        <h1 className="success-title">Booking Confirmed!</h1>
        <p className="success-subtitle">Your ticket has been successfully booked</p>

        <div className="ticket-card">
          <div className="ticket-header">
            <div>
              <h2 className="ticket-title">RailConnect</h2>
              <p className="ticket-subtitle">E-Ticket</p>
            </div>
            <div className="ticket-pnr">
              <span className="ticket-pnr__label">PNR</span>
              <span className="ticket-pnr__value">{pnrNumber}</span>
            </div>
          </div>

          <div className="ticket-body">
            <div className="ticket-section">
              <h3 className="ticket-section__title">Train Details</h3>
              <div className="ticket-info">
                <div className="ticket-info__row">
                  <span>Train Name:</span>
                  <strong>{train.name}</strong>
                </div>
                <div className="ticket-info__row">
                  <span>Train Number:</span>
                  <strong>#{train.number}</strong>
                </div>
                <div className="ticket-info__row">
                  <span>Class:</span>
                  <strong>{selectedClass}</strong>
                </div>
              </div>
            </div>

            <div className="ticket-section">
              <h3 className="ticket-section__title">Journey Details</h3>
              <div className="ticket-info">
                <div className="ticket-info__row">
                  <span>From:</span>
                  <strong>{train.from}</strong>
                </div>
                <div className="ticket-info__row">
                  <span>To:</span>
                  <strong>{train.to}</strong>
                </div>
                <div className="ticket-info__row">
                  <span>Date:</span>
                  <strong>{travelDate}</strong>
                </div>
                <div className="ticket-info__row">
                  <span>Departure:</span>
                  <strong>{train.departure}</strong>
                </div>
                <div className="ticket-info__row">
                  <span>Arrival:</span>
                  <strong>{train.arrival}</strong>
                </div>
                <div className="ticket-info__row">
                  <span>Duration:</span>
                  <strong>{train.duration}</strong>
                </div>
              </div>
            </div>

            <div className="ticket-section">
              <h3 className="ticket-section__title">Passenger Details</h3>
              <div className="ticket-info">
                <div className="ticket-info__row">
                  <span>Name:</span>
                  <strong>{passenger.name}</strong>
                </div>
                <div className="ticket-info__row">
                  <span>Age:</span>
                  <strong>{passenger.age} years</strong>
                </div>
                <div className="ticket-info__row">
                  <span>Gender:</span>
                  <strong>{passenger.gender}</strong>
                </div>
                <div className="ticket-info__row">
                  <span>Phone:</span>
                  <strong>{passenger.phone}</strong>
                </div>
                <div className="ticket-info__row">
                  <span>Email:</span>
                  <strong>{passenger.email}</strong>
                </div>
              </div>
            </div>

            <div className="ticket-section ticket-section--highlight">
              <div className="ticket-info">
                <div className="ticket-info__row ticket-info__row--total">
                  <span>Total Amount Paid:</span>
                  <strong className="price-large">₹{price.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="ticket-footer">
            <p className="ticket-note">
              <strong>Note:</strong> This is a mock booking. Please carry a valid ID proof while traveling.
            </p>
          </div>
        </div>

        <div className="success-actions">
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Book Another Ticket
          </button>
          <button className="btn btn-secondary" onClick={() => window.print()}>
            Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
