import React, { useState, useEffect } from 'react';
import { getWeeklyForecast } from '../services/weatherApi.js';
import LoadingSpinner from './LoadingSpinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import { getWeatherIcon } from '../utils/weatherIcons.js';
import { getDayName, getShortDate, convertTemperature, getTemperatureUnit } from '../utils/helpers.js';
import { useTemperature } from '../contexts/TemperatureContext.jsx';

const WeeklyForecast = () => {
  const { unit } = useTemperature();
  const [city, setCity] = useState('Toronto');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeeklyForecast = async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getWeeklyForecast(cityName);
      // Ensure we always have exactly 7 days
      const sevenDayForecast = data.daily.slice(0, 7);
      setForecast(sevenDayForecast);
    } catch (err) {
      setError(err.message);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeeklyForecast(city);
  };

  useEffect(() => {
    fetchWeeklyForecast(city);
  }, []);

  const unitSymbol = getTemperatureUnit(unit);

  return (
    <div className="weekly-forecast-container">
      <header>
        <h1>7-Day Forecast</h1>
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

      {loading && <LoadingSpinner message="Loading weekly forecast..." />}

      {error && <ErrorMessage message={error} onRetry={() => fetchWeeklyForecast(city)} />}

      {!loading && !error && forecast.length > 0 && (
        <div className="weekly-forecast-content">
          <div className="forecast-summary">
            <h3>7-Day Weather Forecast for {city}</h3>
            <p>Showing {forecast.length} days of weather data</p>
          </div>
          
          <div className="weekly-forecast-list">
            {forecast.map((day, index) => (
              <div key={day.dt} className="weekly-forecast-item">
                <div className="day-info">
                  <div className="day-name">
                    {index === 0 ? 'Today' : getDayName(day.dt)}
                  </div>
                  <div className="day-date">{getShortDate(day.dt)}</div>
                </div>
                <div className="weather-icon">
                  {getWeatherIcon(day.weather.icon)}
                </div>
                <div className="weather-desc">
                  {day.weather.description}
                </div>
                <div className="temperature-range">
                  <span className="temp-high">{convertTemperature(day.temp_max, 'C', unit)}{unitSymbol}</span>
                  <span className="temp-low">{convertTemperature(day.temp_min, 'C', unit)}{unitSymbol}</span>
                </div>
                <div className="additional-info">
                  <div className="humidity">💧 {Math.round(day.humidity)}%</div>
                  <div className="wind">💨 {Math.round(day.wind_speed)} m/s</div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced temperature trend chart */}
          <div className="temperature-chart">
            <h3>7-Day Temperature Trend</h3>
            <div className="chart-container">
              {forecast.map((day, index) => {
                const displayTempMax = convertTemperature(day.temp_max, 'C', unit);
                const displayTempMin = convertTemperature(day.temp_min, 'C', unit);
                
                return (
                  <div key={day.dt} className="chart-bar">
                    <div className="temp-values">
                      <span className="temp-high-label">{displayTempMax}{unitSymbol}</span>
                    </div>
                    <div 
                      className="temp-bar-high" 
                      style={{ 
                        height: `${Math.max((displayTempMax + 10) * 2, 20)}px`,
                        backgroundColor: '#ff6b6b'
                      }}
                    ></div>
                    <div 
                      className="temp-bar-low" 
                      style={{ 
                        height: `${Math.max((displayTempMin + 10) * 2, 20)}px`,
                        backgroundColor: '#4ecdc4'
                      }}
                    ></div>
                    <div className="temp-values">
                      <span className="temp-low-label">{displayTempMin}{unitSymbol}</span>
                    </div>
                    <div className="chart-day">
                      {index === 0 ? 'Today' : getDayName(day.dt).slice(0, 3)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color high"></span>
                <span>High Temperature</span>
              </div>
              <div className="legend-item">
                <span className="legend-color low"></span>
                <span>Low Temperature</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyForecast;
