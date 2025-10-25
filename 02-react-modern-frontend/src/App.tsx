import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import FavoriteCities from './components/FavoriteCities';
import './App.css';

// Demo weather data to showcase the beautiful card!
// Remove this once you connect to the real API
const demoWeatherData = {
  city: 'London',
  country: 'United Kingdom',
  temperature: 18,
  feelsLike: 16,
  description: 'partly cloudy',
  humidity: 65,
  windSpeed: 4.5,
  icon: '02d'
};

const App = () => {
  const handleSearch = (city: string) => {
    console.log('Searching for:', city);
    // TODO: Implement weather API call with the city
  };

  // Set to 'demo' to see the beautiful weather card, or undefined to see placeholder
  const weatherData = demoWeatherData; // Change to undefined to see placeholder

  return (
    <div className="app">
      <Header />
      
      <div className="app-container">
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="main-content">
          <div className="weather-section">
            <CurrentWeather weatherData={weatherData} />
          </div>

          <div className="sidebar-section">
            <FavoriteCities />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
