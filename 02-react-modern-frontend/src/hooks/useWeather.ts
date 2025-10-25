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

interface ForecastDay {
  date: Date;
  dayName: string;
  tempHigh: number;
  tempLow: number;
  description: string;
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
  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);
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

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
      );

      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        const processedForecast = processForecastData(forecastData);
        setForecastData(processedForecast);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setWeatherData(undefined);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  // Process forecast data to get daily forecasts
  const processForecastData = (data: any): ForecastDay[] => {
    const dailyData: { [key: string]: any[] } = {};

    // Group forecast data by day
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = [];
      }
      dailyData[dateKey].push(item);
    });

    // Process each day to get high/low temps and most common weather
    const forecastDays: ForecastDay[] = Object.entries(dailyData)
      .slice(0, 5) // Get only next 5 days
      .map(([dateKey, items]) => {
        const temps = items.map((item: any) => item.main.temp);
        const tempHigh = Math.max(...temps);
        const tempLow = Math.min(...temps);

        // Get the weather condition that appears most around midday
        const middayItem = items.find((item: any) => {
          const hour = new Date(item.dt * 1000).getHours();
          return hour >= 12 && hour <= 15;
        }) || items[0];

        const date = new Date(dateKey);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        return {
          date,
          dayName,
          tempHigh,
          tempLow,
          description: middayItem.weather[0].description,
          icon: middayItem.weather[0].icon,
        };
      });

    return forecastDays;
  };

  return {
    weatherData,
    forecastData,
    loading,
    error,
    searchedCity,
    fetchWeather,
  };
};

export default useWeather;

