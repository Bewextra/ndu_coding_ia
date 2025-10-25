import './LoadingSpinner.css';
import Sengi from './Sengi';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <Sengi mode="loading" />
      <p className="loading-text">Fetching weather data...</p>
    </div>
  );
};

export default LoadingSpinner;

