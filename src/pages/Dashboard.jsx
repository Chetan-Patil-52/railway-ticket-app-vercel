import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STATIONS = [
  'Mumbai Central',
  'Mumbai CSMT',
  'New Delhi',
  'Nagpur',
  'Mangalore',
  'Chennai Central',
  'Bangalore City',
  'Pune Junction',
  'Hyderabad Deccan',
  'Howrah',
  'Ahmedabad Junction',
  'Kolkata',
  'Surat',
  'Vadodara',
  'Jaipur',
  'Lucknow',
  'Kanpur',
  'Patna',
  'Bhopal',
  'Indore',
  'Varanasi',
  'Amritsar',
  'Chandigarh',
  'Goa',
  'Kochi',
  'Trivandrum',
  'Coimbatore',
  'Madurai',
  'Vijayawada',
  'Visakhapatnam',
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [source, setSource] = useState('Mumbai Central');
  const [destination, setDestination] = useState('New Delhi');
  const [date, setDate] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!date) return;

    navigate('/trains', {
      state: {
        source,
        destination,
        date,
      },
    });
  }

  const isSearchDisabled = !date || source === destination;

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <h1 className="app-title">RailConnect</h1>
        <p className="app-subtitle">Search IRCTC-style trains with mock data</p>
      </header>

      <main className="app-shell__main">
        {/* Promotional Banners */}
        <div className="promo-banners">
          <div className="promo-banner promo-banner--primary">
            <div className="promo-banner__content">
              <h3 className="promo-banner__title">🎉 Special Offer!</h3>
              <p className="promo-banner__text">Get 15% cashback on all bookings this month</p>
            </div>
          </div>
          <div className="promo-banner promo-banner--secondary">
            <div className="promo-banner__content">
              <h3 className="promo-banner__title">🚄 Book Early & Save</h3>
              <p className="promo-banner__text">Advance bookings get exclusive discounts</p>
            </div>
          </div>
        </div>

        {/* Train Image Section */}
        <div className="train-hero">
          <div className="train-hero__image">
            <div className="train-placeholder">
              <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="200" fill="url(#trainGradient)"/>
                <defs>
                  <linearGradient id="trainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e40af" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
                <rect x="50" y="80" width="300" height="60" rx="5" fill="#ffffff" opacity="0.9"/>
                <rect x="60" y="90" width="40" height="40" rx="3" fill="#1e40af"/>
                <circle cx="100" cy="150" r="15" fill="#1e3a8a"/>
                <circle cx="200" cy="150" r="15" fill="#1e3a8a"/>
                <circle cx="300" cy="150" r="15" fill="#1e3a8a"/>
                <path d="M350 80 L380 60 L380 140 L350 140 Z" fill="#ef4444"/>
                <text x="200" y="120" textAnchor="middle" fill="#1e40af" fontSize="24" fontWeight="bold">RailConnect</text>
              </svg>
            </div>
          </div>
        </div>

        <section className="card">
          <h2 className="card__title">Plan your journey</h2>
          <p className="card__subtitle">Choose source, destination, and travel date.</p>

          <form className="form form--grid" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="source">From</label>
              <select
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                {STATIONS.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="destination">To</label>
              <select
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                {STATIONS.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button
                className="btn btn-primary btn-full"
                type="submit"
                disabled={isSearchDisabled}
              >
                Search trains
              </button>
              {source === destination && (
                <p className="form-hint form-hint--error">
                  Source and destination cannot be the same.
                </p>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}


