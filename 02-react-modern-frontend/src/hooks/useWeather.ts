import { useState } from 'react';

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

interface WeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchedCity, setSearchedCity] = useState('');

  const fetchWeather = async (city: string) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    if (!apiKey) {
      setError('API key is missing. Please add VITE_WEATHER_API_KEY to your .env file');
      return;
    }

    setLoading(true);
    setError('');
    setSearchedCity(city);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your .env file.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again later.');
        }
      }

      const data: WeatherResponse = await response.json();

      const transformedData: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      };

      setWeatherData(transformedData);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setWeatherData(undefined);
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData,
    loading,
    error,
    searchedCity,
    fetchWeather,
  };
};

export default useWeather;

