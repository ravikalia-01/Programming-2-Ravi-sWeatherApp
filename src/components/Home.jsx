import React, { useState, useEffect } from 'react';
import { getCurrentWeatherByCity, getCurrentWeatherByCoords } from '../services/weatherApi.js';
import WeatherCard from './WeatherCard.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);

  const fetchWeatherByCity = async (cityName) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getCurrentWeatherByCity(cityName);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLocationLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getCurrentWeatherByCoords(latitude, longitude);
          setWeather(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLocationLoading(false);
      }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherByCity(searchCity);
  };

  const handleRetry = () => {
    if (searchCity) {
      fetchWeatherByCity(searchCity);
    }
  };

  useEffect(() => {
    // Load weather for a default city on component mount
    fetchWeatherByCity('Toronto');
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Weather Forecast</h1>
        <p>Get current weather conditions for any city</p>
      </header>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            Search
          </button>
        </form>
        
        <button 
          onClick={fetchWeatherByLocation} 
          className="location-button"
          disabled={locationLoading}
        >
          {locationLoading ? 'Getting Location...' : '📍 Use My Location'}
        </button>
      </div>

      <div className="weather-content">
        {loading && <LoadingSpinner message="Fetching weather data..." />}
        
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={handleRetry}
          />
        )}
        
        {weather && !loading && !error && (
          <WeatherCard weather={weather} showDetails={true} />
        )}
      </div>
    </div>
  );
};

export default Home;
