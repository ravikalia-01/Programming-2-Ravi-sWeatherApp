import React, { useState, useEffect } from 'react';
import { getHourlyForecast } from '../services/weatherApi.js';
import LoadingSpinner from './LoadingSpinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import { getWeatherIcon } from '../utils/weatherIcons.js';
import { formatHour, convertTemperature, getTemperatureUnit } from '../utils/helpers.js';
import { useTemperature } from '../contexts/TemperatureContext.jsx';

const HourlyForecast = () => {
  const { unit } = useTemperature();
  const [city, setCity] = useState('London');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHourlyForecast = async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getHourlyForecast(cityName);
      setForecast(data.list);
    } catch (err) {
      setError(err.message);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHourlyForecast(city);
  };

  useEffect(() => {
    fetchHourlyForecast(city);
  }, []);

  const unitSymbol = getTemperatureUnit(unit);

  return (
    <div className="hourly-forecast-container">
      <header>
        <h1>Hourly Forecast</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
          />
          <button type="submit" disabled={loading} className="search-button">
            Search
          </button>
        </form>
      </header>

      {loading && <LoadingSpinner message="Loading hourly forecast..." />}

      {error && <ErrorMessage message={error} onRetry={() => fetchHourlyForecast(city)} />}

      {!loading && !error && forecast.length > 0 && (
        <div className="hourly-forecast-list">
          {forecast.map((hour) => (
            <div key={hour.dt} className="hourly-forecast-item">
              <div className="hour">{formatHour(hour.dt)}</div>
              <div className="icon">{getWeatherIcon(hour.weather[0].icon)}</div>
              <div className="temp">{convertTemperature(hour.main.temp, 'C', unit)}{unitSymbol}</div>
              <div className="desc">{hour.weather[0].description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HourlyForecast;
