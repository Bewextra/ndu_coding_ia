import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  cityName?: string;
}

const ErrorMessage = ({ message, cityName }: ErrorMessageProps) => {
  return (
    <div className="error-container">
      <div className="error-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h3 className="error-title">Oops! Something went wrong</h3>
      {cityName && <p className="error-city">Searched for: <strong>{cityName}</strong></p>}
      <p className="error-message">{message}</p>
      <p className="error-hint">Try searching for another city or check your spelling.</p>
    </div>
  );
};

export default ErrorMessage;

