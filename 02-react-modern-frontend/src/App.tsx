import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import FavoriteCities from './components/FavoriteCities';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WeatherForecast from './components/WeatherForecast';
import WelcomeSengi from './components/WelcomeSengi';
import useWeather from './hooks/useWeather';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

interface FavoriteCity {
  name: string;
  country: string;
}

const App = () => {
  const { weatherData, forecastData, loading, error, searchedCity, fetchWeather } = useWeather();
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>('favoriteCities', []);

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  const handleRetry = () => {
    if (searchedCity) {
      fetchWeather(searchedCity);
    }
  };

  const handleToggleFavorite = () => {
    if (!weatherData) return;

    const cityExists = favorites.some(fav => fav.name === weatherData.city);

    if (cityExists) {
      // Remove from favorites
      setFavorites(favorites.filter(fav => fav.name !== weatherData.city));
    } else {
      // Add to favorites
      setFavorites([...favorites, { name: weatherData.city, country: weatherData.country }]);
    }
  };

  const handleFavoriteCityClick = (cityName: string) => {
    fetchWeather(cityName);
  };

  const isFavorite = weatherData ? favorites.some(fav => fav.name === weatherData.city) : false;

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
                <CurrentWeather 
                  weatherData={weatherData} 
                  isFavorite={isFavorite}
                  onToggleFavorite={handleToggleFavorite}
                />
                {weatherData && <WeatherForecast forecastData={forecastData} />}
              </>
            ) : (
              <WelcomeSengi />
            )}
          </div>

          <div className="sidebar-section">
            <FavoriteCities 
              favorites={favorites}
              onCityClick={handleFavoriteCityClick}
              currentCity={weatherData?.city}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
