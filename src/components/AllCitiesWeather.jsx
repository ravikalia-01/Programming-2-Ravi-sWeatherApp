import React, { useState, useEffect } from 'react';
import { getCurrentWeatherByCity } from '../services/weatherApi.js';
import WeatherCard from './WeatherCard.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';

const AllCitiesWeather = () => {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [customCities, setCustomCities] = useState([]);

  // Comprehensive list of cities from all over the world
  const defaultCities = [
    // North America
    'New York', 'Los Angeles', 'Chicago', 'Toronto', 'Vancouver', 'Mexico City',
    // South America
    'São Paulo', 'Buenos Aires', 'Rio de Janeiro', 'Lima', 'Bogotá', 'Santiago',
    // Europe
    'London', 'Paris', 'Berlin', 'Madrid', 'Rome', 'Amsterdam', 'Stockholm', 'Vienna',
    // Asia
    'Tokyo', 'Beijing', 'Mumbai', 'Delhi', 'Shanghai', 'Seoul', 'Bangkok', 'Singapore',
    // Middle East
    'Dubai', 'Istanbul', 'Tehran', 'Riyadh', 'Tel Aviv', 'Cairo',
    // Africa
    'Lagos', 'Cairo', 'Johannesburg', 'Nairobi', 'Casablanca', 'Addis Ababa',
    // Oceania
    'Sydney', 'Melbourne', 'Auckland', 'Perth', 'Brisbane', 'Adelaide'
  ];

  // Combine default cities with custom added cities
  const allCities = [...defaultCities, ...customCities];

  const fetchAllCitiesWeather = async (citiesToFetch = allCities) => {
    setLoading(true);
    setError(null);
    setCitiesWeather([]);

    try {
      // Limit to first 20 cities to avoid too many API calls
      const limitedCities = citiesToFetch.slice(0, 20);
      
      const weatherPromises = limitedCities.map(city => 
        getCurrentWeatherByCity(city).catch(err => ({
          error: true,
          city: city,
          message: err.message
        }))
      );

      const results = await Promise.all(weatherPromises);
      
      // Separate successful results from errors
      const successfulResults = results.filter(result => !result.error);
      const errorResults = results.filter(result => result.error);

      setCitiesWeather(successfulResults);

      // If there are any errors, show them
      if (errorResults.length > 0) {
        const errorCities = errorResults.map(err => err.city).join(', ');
        setError(`Failed to load weather for: ${errorCities}`);
      }

    } catch (err) {
      setError('Failed to load weather data for cities');
    } finally {
      setLoading(false);
    }
  };

  const addCustomCity = (e) => {
    e.preventDefault();
    if (!searchCity.trim()) return;
    
    const cityName = searchCity.trim();
    
    // Check if city already exists
    if (allCities.some(city => city.toLowerCase() === cityName.toLowerCase())) {
      setError(`${cityName} is already in the list`);
      return;
    }
    
    // Add to custom cities
    setCustomCities(prev => [...prev, cityName]);
    setSearchCity('');
    setError(null);
    
    // Fetch weather for the new city
    getCurrentWeatherByCity(cityName)
      .then(weather => {
        setCitiesWeather(prev => [...prev, weather]);
      })
      .catch(err => {
        setError(`Failed to fetch weather for ${cityName}: ${err.message}`);
      });
  };

  const removeCustomCity = (cityToRemove) => {
    setCustomCities(prev => prev.filter(city => city !== cityToRemove));
    setCitiesWeather(prev => prev.filter(weather => weather.name !== cityToRemove));
  };

  const handleRetry = () => {
    fetchAllCitiesWeather();
  };

  useEffect(() => {
    fetchAllCitiesWeather();
  }, []);

  return (
    <div className="all-cities-container">
      <header className="all-cities-header">
        <h1>Weather Around the World</h1>
        <p>Current weather conditions for cities worldwide from all continents</p>
        
        <div className="controls-section">
          <form onSubmit={addCustomCity} className="add-city-form">
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Add a city (e.g., Barcelona, Cape Town, Kyoto)..."
              className="city-search-input"
            />
            <button type="submit" className="add-city-button" disabled={loading}>
              Add City
            </button>
          </form>
          
          <button 
            onClick={() => fetchAllCitiesWeather()} 
            className="refresh-button"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : '🔄 Refresh All'}
          </button>
        </div>

        {customCities.length > 0 && (
          <div className="custom-cities">
            <p>Custom cities added:</p>
            <div className="custom-cities-list">
              {customCities.map(city => (
                <span key={city} className="custom-city-tag">
                  {city}
                  <button 
                    onClick={() => removeCustomCity(city)}
                    className="remove-city-button"
                    title={`Remove ${city}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      {loading && <LoadingSpinner message="Loading weather data for all cities..." />}

      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={handleRetry}
        />
      )}

      {!loading && citiesWeather.length > 0 && (
        <div className="cities-grid">
          {citiesWeather.map((weather, index) => (
            <div key={weather.name || index} className="city-weather-item">
              <WeatherCard weather={weather} showDetails={false} />
            </div>
          ))}
        </div>
      )}

      {!loading && citiesWeather.length === 0 && !error && (
        <div className="no-data">
          <p>No weather data available. Please try refreshing.</p>
        </div>
      )}
    </div>
  );
};

export default AllCitiesWeather;
