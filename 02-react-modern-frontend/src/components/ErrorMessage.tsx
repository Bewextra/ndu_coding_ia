import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  cityName?: string;
  onRetry: () => void;
}

const ErrorMessage = ({ message, cityName, onRetry }: ErrorMessageProps) => {
  const handleRetry = () => {
    onRetry();
  };

  return (
    <div className="error-container">
      <div className="error-sengi-wrapper">
        <svg 
          className="sengi error-sengi" 
          width="100" 
          height="100" 
          viewBox="0 0 220 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tail (behind) */}
          <path 
            d="M 30 90 Q 15 85 10 95 Q 8 105 12 110" 
            stroke="#8B7355" 
            strokeWidth="6" 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Back legs */}
          <rect x="45" y="110" width="10" height="30" rx="5" fill="#8B7355"/>
          <rect x="65" y="110" width="10" height="30" rx="5" fill="#8B7355"/>
          <ellipse cx="50" cy="142" rx="6" ry="4" fill="#6D5A47"/>
          <ellipse cx="70" cy="142" rx="6" ry="4" fill="#6D5A47"/>
          
          {/* Body (side view - elongated) */}
          <ellipse cx="80" cy="90" rx="55" ry="35" fill="#A0826D"/>
          
          {/* Front legs */}
          <rect x="110" y="105" width="9" height="28" rx="4" fill="#8B7355"/>
          <rect x="125" y="105" width="9" height="28" rx="4" fill="#8B7355"/>
          <ellipse cx="115" cy="135" rx="5" ry="3" fill="#6D5A47"/>
          <ellipse cx="130" cy="135" rx="5" ry="3" fill="#6D5A47"/>
          
          {/* Head (side view) */}
          <ellipse cx="135" cy="75" rx="28" ry="25" fill="#A0826D"/>
          
          {/* Round ear */}
          <ellipse cx="130" cy="55" rx="14" ry="18" fill="#A0826D"/>
          <ellipse cx="130" cy="55" rx="9" ry="13" fill="#C9A88A"/>
          
          {/* Long snout/nose extending forward */}
          <ellipse cx="160" cy="75" rx="25" ry="12" fill="#8B7355"/>
          
          {/* Nose tip (black) */}
          <ellipse cx="183" cy="75" rx="5" ry="6" fill="#2C1810"/>
          
          {/* Whiskers */}
          <line x1="170" y1="70" x2="200" y2="65" stroke="#2C1810" strokeWidth="1.5"/>
          <line x1="175" y1="75" x2="205" y2="75" stroke="#2C1810" strokeWidth="1.5"/>
          <line x1="170" y1="80" x2="200" y2="85" stroke="#2C1810" strokeWidth="1.5"/>
          
          {/* Confused/worried eyes */}
          <g className="sengi-eyes">
            <ellipse cx="145" cy="72" rx="7" ry="8" fill="#2C1810"/>
            <ellipse cx="147" cy="70" rx="2" ry="3" fill="#FFFFFF"/>
          </g>
          
          {/* Confused mouth */}
          <ellipse cx="165" cy="83" rx="4" ry="3" fill="#2C1810" opacity="0.4"/>
          
          {/* Belly detail */}
          <ellipse cx="80" cy="100" rx="40" ry="25" fill="#C9A88A" opacity="0.6"/>
        </svg>
        
        {/* Question mark */}
        <div className="error-question-mark">?</div>
      </div>
      
      <h3 className="error-title">Oops! Something went wrong</h3>
      {cityName && <p className="error-city">Searched for: <strong>{cityName}</strong></p>}
      <p className="error-message">{message}</p>
      <p className="error-hint">Try searching for another city or check your spelling.</p>
      <button 
        className="retry-button" 
        onClick={handleRetry}
        aria-label="Try again"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;

