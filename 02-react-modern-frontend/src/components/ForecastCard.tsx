import './ForecastCard.css';

interface ForecastCardProps {
  dayName: string;
  tempHigh: number;
  tempLow: number;
  description: string;
  icon: string;
}

const ForecastCard = ({ dayName, tempHigh, tempLow, description, icon }: ForecastCardProps) => {
  return (
    <div className="forecast-card">
      <h3 className="forecast-day">{dayName}</h3>
      <img 
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="forecast-icon"
      />
      <div className="forecast-temps">
        <span className="forecast-temp-high">{Math.round(tempHigh)}°</span>
        <span className="forecast-temp-separator">/</span>
        <span className="forecast-temp-low">{Math.round(tempLow)}°</span>
      </div>
      <p className="forecast-description">{description}</p>
    </div>
  );
};

export default ForecastCard;

