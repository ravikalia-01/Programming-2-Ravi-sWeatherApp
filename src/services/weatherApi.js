import axios from 'axios';

const RAPIDAPI_KEY = '1da018b19cmshf1e3c96c2341487p19f979jsn6d4e0a97e8e8';
const RAPIDAPI_HOST = 'weather-api167.p.rapidapi.com';
const BASE_URL = 'https://weather-api167.p.rapidapi.com';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'x-rapidapi-host': RAPIDAPI_HOST,
    'x-rapidapi-key': RAPIDAPI_KEY
  }
});

// Transform weather API response to match our expected format
const transformCurrentWeather = (data, cityName = 'Unknown') => {
  if (!data || !data.list || !data.list[0]) {
    throw new Error('Invalid weather data received');
  }

  const current = data.list[0];
  
  return {
    name: data.city?.name || cityName,
    sys: { country: data.city?.country || 'Unknown' },
    main: {
      temp: Math.round(current.main?.temprature || current.main?.temp || 0),
      feels_like: Math.round(current.main?.temprature_feels_like || current.main?.feels_like || current.main?.temprature || current.main?.temp || 0),
      humidity: current.main?.humidity || 0,
      pressure: current.main?.pressure || 0
    },
    weather: [{
      main: current.weather?.[0]?.main || 'Clear',
      description: current.weather?.[0]?.description || 'clear sky',
      icon: current.weather?.[0]?.icon || '01d'
    }],
    wind: { 
      speed: current.wind?.speed || 0,
      direction: current.wind?.degrees || current.wind?.deg || 0
    },
    visibility: current.visibility_distance || current.visibility || 10000,
    dt: current.dt || Math.floor(Date.now() / 1000)
  };
};

// Transform forecast data for hourly use
const transformHourlyForecast = (data) => {
  if (!data || !data.list) {
    throw new Error('Invalid forecast data received');
  }

  const hourlyData = data.list.slice(0, 24).map(forecast => ({
    dt: forecast.dt || Math.floor(Date.now() / 1000),
    main: {
      temp: Math.round(forecast.main?.temprature || forecast.main?.temp || 0),
      feels_like: Math.round(forecast.main?.temprature_feels_like || forecast.main?.feels_like || forecast.main?.temprature || forecast.main?.temp || 0),
      humidity: forecast.main?.humidity || 0,
      pressure: forecast.main?.pressure || 0
    },
    weather: [{
      main: forecast.weather?.[0]?.main || 'Clear',
      description: forecast.weather?.[0]?.description || 'clear sky',
      icon: forecast.weather?.[0]?.icon || '01d'
    }],
    wind: {
      speed: forecast.wind?.speed || 0,
      direction: forecast.wind?.degrees || forecast.wind?.deg || 0
    }
  }));

  return {
    list: hourlyData
  };
};

// Transform forecast data for weekly use
const transformWeeklyForecast = (data) => {
  if (!data || !data.list) {
    throw new Error('Invalid forecast data received');
  }

  // Group hourly data by day to create daily forecasts
  const dailyData = {};
  
  data.list.forEach(forecast => {
    const date = new Date(forecast.dt * 1000).toISOString().split('T')[0];
    
    if (!dailyData[date]) {
      dailyData[date] = {
        date: date,
        dt: forecast.dt,
        temps: [],
        humidity: [],
        wind_speed: [],
        weather: forecast.weather?.[0]
      };
    }
    
    dailyData[date].temps.push(forecast.main?.temprature || forecast.main?.temp || 0);
    dailyData[date].humidity.push(forecast.main?.humidity || 0);
    dailyData[date].wind_speed.push(forecast.wind?.speed || 0);
  });

  const weeklyData = Object.values(dailyData).slice(0, 7).map((day, index) => ({
    date: day.date,
    dt: day.dt || (Math.floor(Date.now() / 1000) + (index * 24 * 3600)),
    temp_max: Math.round(Math.max(...day.temps)),
    temp_min: Math.round(Math.min(...day.temps)),
    temp_avg: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
    humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
    wind_speed: Math.round(day.wind_speed.reduce((a, b) => a + b, 0) / day.wind_speed.length),
    weather: {
      main: day.weather?.main || 'Clear',
      description: day.weather?.description || 'clear sky',
      icon: day.weather?.icon || '01d'
    }
  }));

  return {
    daily: weeklyData
  };
};

export const getCurrentWeatherByCity = async (cityName) => {
  try {
    const response = await weatherApi.get('/api/weather/forecast', {
      params: {
        place: `${cityName}`,
        cnt: 1,
        units: 'metric', // Use metric for Celsius
        type: 'three_hour',
        mode: 'json',
        lang: 'en'
      }
    });


    return transformCurrentWeather(response.data, cityName);
  } catch (error) {
    throw new Error(error.response?.data?.message || `Failed to fetch weather data for ${cityName}`);
  }
};

export const getCurrentWeatherByCoords = async (lat, lon) => {
  try {
    const response = await weatherApi.get('/api/weather/forecast', {
      params: {
        place: `${lat},${lon}`,
        cnt: 1,
        units: 'metric',
        type: 'three_hour',
        mode: 'json',
        lang: 'en'
      }
    });

    return transformCurrentWeather(response.data, 'Your Location');
  } catch (error) {
    throw new Error('Failed to fetch weather data for your location');
  }
};

export const getHourlyForecast = async (cityName) => {
  try {
    const response = await weatherApi.get('/api/weather/forecast', {
      params: {
        place: `${cityName}`,
        cnt: 24, // Get 24 hours of data
        units: 'metric',
        type: 'three_hour',
        mode: 'json',
        lang: 'en'
      }
    });

    return transformHourlyForecast(response.data);
  } catch (error) {
    throw new Error(error.response?.data?.message || `Failed to fetch hourly forecast for ${cityName}`);
  }
};

export const getHourlyForecastByCoords = async (lat, lon) => {
  try {
    const response = await weatherApi.get('/api/weather/forecast', {
      params: {
        place: `${lat},${lon}`,
        cnt: 24,
        units: 'metric',
        type: 'three_hour',
        mode: 'json',
        lang: 'en'
      }
    });

    return transformHourlyForecast(response.data);
  } catch (error) {
    throw new Error('Failed to fetch hourly forecast for your location');
  }
};

export const getWeeklyForecast = async (cityName) => {
  try {
    const response = await weatherApi.get('/api/weather/forecast', {
      params: {
        place: `${cityName}`,
        cnt: 56, // Get more data points to cover 7 days (8 per day * 7 days)
        units: 'metric',
        type: 'three_hour',
        mode: 'json',
        lang: 'en'
      }
    });

    return transformWeeklyForecast(response.data);
  } catch (error) {
    throw new Error(error.response?.data?.message || `Failed to fetch weekly forecast for ${cityName}`);
  }
};
