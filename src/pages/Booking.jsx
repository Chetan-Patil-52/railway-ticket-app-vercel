import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { train, travelDate } = location.state || {};

  const [selectedClass, setSelectedClass] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [passengerAge, setPassengerAge] = useState('');
  const [passengerGender, setPassengerGender] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');

  if (!train) {
    return (
      <div className="app-shell">
        <div className="card">
          <h2 className="card__title">No train selected</h2>
          <p className="card__subtitle">Please select a train first.</p>
          <button className="btn btn-primary" onClick={() => navigate('/trains')}>
            Go to Trains
          </button>
        </div>
      </div>
    );
  }

  const availableClasses = Object.entries(train.classes).filter(
    ([_, cls]) => cls && cls.price > 0
  );

  const selectedClassData = selectedClass ? train.classes[selectedClass] : null;
  const totalPrice = selectedClassData ? selectedClassData.price : 0;

  function handleSubmit(event) {
    event.preventDefault();
    if (!selectedClass) {
      alert('Please select a class');
      return;
    }

    navigate('/payment', {
      state: {
        train,
        travelDate,
        selectedClass: selectedClassData.label,
        price: totalPrice,
        passenger: {
          name: passengerName,
          age: passengerAge,
          gender: passengerGender,
          phone: passengerPhone,
          email: passengerEmail,
        },
      },
    });
  }

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <button
          type="button"
          className="link-button"
          onClick={() => navigate('/trains', { state: { source: train.from, destination: train.to, date: travelDate } })}
        >
          ← Back to Trains
        </button>
        <h1 className="app-title">Book Your Ticket</h1>
        <p className="app-subtitle">
          {train.name} (#{train.number}) • {train.from} → {train.to}
        </p>
      </header>

      <main className="app-shell__main">
        <div className="booking-layout">
          <section className="card">
            <h2 className="card__title">Train Details</h2>
            <div className="train-summary">
              <div className="train-summary__row">
                <span>Train:</span>
                <strong>{train.name} (#{train.number})</strong>
              </div>
              <div className="train-summary__row">
                <span>Route:</span>
                <strong>{train.from} → {train.to}</strong>
              </div>
              <div className="train-summary__row">
                <span>Date:</span>
                <strong>{travelDate || 'Not specified'}</strong>
              </div>
              <div className="train-summary__row">
                <span>Departure:</span>
                <strong>{train.departure}</strong>
              </div>
              <div className="train-summary__row">
                <span>Arrival:</span>
                <strong>{train.arrival}</strong>
              </div>
              <div className="train-summary__row">
                <span>Duration:</span>
                <strong>{train.duration}</strong>
              </div>
              <div className="train-summary__row">
                <span>Available Seats:</span>
                <strong className="text-success">{train.availableSeats}</strong>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="card__title">Select Class</h2>
            <div className="class-selection">
              {availableClasses.map(([key, cls]) => (
                <label key={key} className={`class-option ${selectedClass === key ? 'class-option--selected' : ''}`}>
                  <input
                    type="radio"
                    name="class"
                    value={key}
                    checked={selectedClass === key}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  />
                  <div className="class-option__content">
                    <span className="class-option__name">{cls.label}</span>
                    <span className="class-option__price">₹{cls.price.toLocaleString('en-IN')}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section className="card">
            <h2 className="card__title">Passenger Details</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="passengerName">Full Name *</label>
                <input
                  id="passengerName"
                  type="text"
                  placeholder="Enter passenger name"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  required
                />
              </div>

              <div className="form--grid">
                <div className="form-field">
                  <label htmlFor="passengerAge">Age *</label>
                  <input
                    id="passengerAge"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Age"
                    value={passengerAge}
                    onChange={(e) => setPassengerAge(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="passengerGender">Gender *</label>
                  <select
                    id="passengerGender"
                    value={passengerGender}
                    onChange={(e) => setPassengerGender(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="passengerPhone">Phone Number *</label>
                <input
                  id="passengerPhone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                />
              </div>

              <div className="form-field">
                <label htmlFor="passengerEmail">Email *</label>
                <input
                  id="passengerEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={passengerEmail}
                  onChange={(e) => setPassengerEmail(e.target.value)}
                  required
                />
              </div>

              {selectedClass && (
                <div className="price-summary">
                  <div className="price-summary__row">
                    <span>Class:</span>
                    <span>{selectedClassData.label}</span>
                  </div>
                  <div className="price-summary__row price-summary__row--total">
                    <span>Total Amount:</span>
                    <strong>₹{totalPrice.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button
                  className="btn btn-primary btn-full"
                  type="submit"
                  disabled={!selectedClass}
                >
                  Proceed to Payment
                </button>
                {!selectedClass && (
                  <p className="form-hint form-hint--error">
                    Please select a class to continue
                  </p>
                )}
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
