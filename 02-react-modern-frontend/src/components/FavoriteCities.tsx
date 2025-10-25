import './FavoriteCities.css';

const FavoriteCities = () => {
  return (
    <aside className="favorite-cities">
      <h2 className="favorite-cities-title">Favorite Cities</h2>
      <div className="favorite-cities-empty">
        <svg 
          className="favorite-icon"
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <p className="favorite-cities-text">No favorite cities yet</p>
        <p className="favorite-cities-hint">
          Search for a city and add it to your favorites
        </p>
      </div>
    </aside>
  );
};

export default FavoriteCities;

