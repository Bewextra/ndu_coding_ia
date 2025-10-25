import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import FavoriteCities from './components/FavoriteCities';
import './App.css';

const App = () => {
  const handleSearch = (city: string) => {
    console.log('Searching for:', city);
    // TODO: Implement weather API call with the city
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
            <CurrentWeather />
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
