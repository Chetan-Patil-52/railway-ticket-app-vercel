import { useNavigate } from 'react-router-dom';
import './TrainCard.css';

function formatPrice(value) {
  if (!value) return 'N/A';
  return `₹${value.toLocaleString('en-IN')}`;
}

export default function TrainCard({ train, travelDate }) {
  const navigate = useNavigate();
  const { name, number, from, to, duration, departure, arrival, availableSeats, classes } = train;

  function handleBook() {
    navigate('/booking', {
      state: {
        train,
        travelDate,
      },
    });
  }

  return (
    <article className="train-card">
      <header className="train-card__header">
        <div>
          <h3 className="train-card__title">{name}</h3>
          <p className="train-card__subtitle">#{number}</p>
        </div>
        {travelDate && (
          <p className="train-card__date">
            Travel date: <span>{travelDate}</span>
          </p>
        )}
      </header>

      <div className="train-card__body">
        <div className="train-card__route">
          <div>
            <p className="train-card__station">{from}</p>
            <p className="train-card__time">{departure}</p>
          </div>
          <div className="train-card__duration">
            <span>{duration}</span>
          </div>
          <div>
            <p className="train-card__station">{to}</p>
            <p className="train-card__time">{arrival}</p>
          </div>
        </div>

        <p className="train-card__seats">Available seats: {availableSeats}</p>

        <div className="train-card__classes">
          {Object.entries(classes).map(([key, cls]) => {
            if (!cls || cls.price === 0) return null;
            return (
              <div key={key} className="train-card__class">
                <p className="train-card__class-name">{cls.label}</p>
                <p className="train-card__class-price">{formatPrice(cls.price)}</p>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="train-card__footer">
        <button className="btn btn-primary" type="button" onClick={handleBook}>
          Book Now
        </button>
      </footer>
    </article>
  );
}


