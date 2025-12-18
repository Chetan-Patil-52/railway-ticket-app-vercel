import { useLocation, useNavigate } from 'react-router-dom';
import { TRAINS } from '../data/trains';
import TrainCard from '../components/TrainCard';

export default function Trains() {
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.state;

  const hasSearch = Boolean(search && search.source && search.destination && search.date);

  const filteredTrains = hasSearch
    ? TRAINS.filter(
        (train) => train.from === search.source && train.to === search.destination,
      )
    : TRAINS;

  const travelDate = hasSearch ? search.date : undefined;

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <button
          type="button"
          className="link-button"
          onClick={() => navigate('/dashboard')}
        >
          ← Modify search
        </button>
        <h1 className="app-title">Available trains</h1>
        {hasSearch && (
          <p className="app-subtitle">
            {search.source} → {search.destination} on {search.date}
          </p>
        )}
        {!hasSearch && (
          <p className="app-subtitle">
            No search context provided. Showing popular mock routes.
          </p>
        )}
      </header>

      <main className="app-shell__main">
        {filteredTrains.length === 0 ? (
          <section className="card">
            <h2 className="card__title">No trains found</h2>
            <p className="card__subtitle">
              Try changing your source or destination to see available mock trains.
            </p>
          </section>
        ) : (
          <section className="train-list">
            {filteredTrains.map((train) => (
              <TrainCard key={train.id} train={train} travelDate={travelDate} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}


