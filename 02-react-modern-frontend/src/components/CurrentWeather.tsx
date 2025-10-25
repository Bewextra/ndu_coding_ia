import './CurrentWeather.css';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface CurrentWeatherProps {
  weatherData?: WeatherData;
}

const CurrentWeather = ({ weatherData }: CurrentWeatherProps) => {
  if (!weatherData) {
    return (
      <div className="current-weather">
        <div className="weather-placeholder">
          <svg 
            className="weather-icon-placeholder"
            width="80" 
            height="80" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <h2 className="weather-placeholder-title">Search for a city</h2>
          <p className="weather-placeholder-text">
            Enter a city name to see the current weather conditions
          </p>
        </div>
      </div>
    );
  }

  const { city, country, temperature, feelsLike, description, humidity, windSpeed, icon } = weatherData;

  return (
    <div className="current-weather">
      <div className="weather-card">
        <div className="weather-header">
          <h2 className="weather-city">{city}</h2>
          <span className="weather-country">{country}</span>
        </div>

        <div className="weather-main">
          <img 
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt={description}
            className="weather-icon"
          />
          <div className="weather-temp-container">
            <span className="weather-temperature">{Math.round(temperature)}°</span>
            <span className="weather-description">{description}</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="weather-detail-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <div className="weather-detail-text">
              <span className="weather-detail-label">Feels Like</span>
              <span className="weather-detail-value">{Math.round(feelsLike)}°</span>
            </div>
          </div>

          <div className="weather-detail-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <div className="weather-detail-text">
              <span className="weather-detail-label">Humidity</span>
              <span className="weather-detail-value">{humidity}%</span>
            </div>
          </div>

          <div className="weather-detail-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
            </svg>
            <div className="weather-detail-text">
              <span className="weather-detail-label">Wind Speed</span>
              <span className="weather-detail-value">{windSpeed} m/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

