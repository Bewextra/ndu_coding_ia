import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import FavoriteCities from './components/FavoriteCities';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WeatherForecast from './components/WeatherForecast';
import WelcomeSengi from './components/WelcomeSengi';
import useWeather from './hooks/useWeather';
import './App.css';

const App = () => {
  const { weatherData, forecastData, loading, error, searchedCity, fetchWeather } = useWeather();

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  const handleRetry = () => {
    if (searchedCity) {
      fetchWeather(searchedCity);
    }
  };

  return (
    <div className="app">
      <Header />
      
      <div className="app-container">
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="main-content">
          <div className="weather-section">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} cityName={searchedCity} onRetry={handleRetry} />
            ) : weatherData ? (
              <>
                <CurrentWeather weatherData={weatherData} />
                {weatherData && <WeatherForecast forecastData={forecastData} />}
              </>
            ) : (
              <WelcomeSengi />
            )}
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
