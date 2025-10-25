import './WeatherForecast.css';
import ForecastCard from './ForecastCard';

interface ForecastDay {
  date: Date;
  dayName: string;
  tempHigh: number;
  tempLow: number;
  description: string;
  icon: string;
}

interface WeatherForecastProps {
  forecastData: ForecastDay[];
}

const WeatherForecast = ({ forecastData }: WeatherForecastProps) => {
  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  return (
    <div className="weather-forecast">
      <h2 className="forecast-title">5-Day Forecast</h2>
      <div className="forecast-cards-container">
        {forecastData.map((day, index) => (
          <ForecastCard
            key={index}
            dayName={day.dayName}
            tempHigh={day.tempHigh}
            tempLow={day.tempLow}
            description={day.description}
            icon={day.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;

