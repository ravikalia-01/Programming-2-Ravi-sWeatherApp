import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons.js';
import { convertTemperature, getTemperatureUnit, capitalize } from '../utils/helpers.js';
import { useTemperature } from '../contexts/TemperatureContext.jsx';

const WeatherCard = ({ weather, showDetails = false }) => {
  const { unit } = useTemperature();
  
  if (!weather) return null;

  const displayTemp = convertTemperature(weather.main.temp, 'C', unit);
  const displayFeelsLike = convertTemperature(weather.main.feels_like, 'C', unit);
  const unitSymbol = getTemperatureUnit(unit);

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="weather-icon">
          {getWeatherIcon(weather.weather[0].icon)}
        </div>
        <div className="weather-info">
          <h2 className="temperature">{displayTemp}{unitSymbol}</h2>
          <p className="description">{capitalize(weather.weather[0].description)}</p>
          <p className="location">{weather.name}, {weather.sys.country}</p>
        </div>
      </div>
      
      {showDetails && (
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Feels like</span>
            <span className="detail-value">{displayFeelsLike}{unitSymbol}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{weather.wind.speed} m/s</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{weather.main.pressure} hPa</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{weather.visibility ? (weather.visibility / 1000).toFixed(1) + ' km' : 'N/A'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
