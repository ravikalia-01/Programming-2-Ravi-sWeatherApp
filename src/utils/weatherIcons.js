// Weather condition to icon mapping
export const getWeatherIcon = (weatherCode, isDay = true) => {
  const iconMap = {
    '01d': '☀️', // clear sky day
    '01n': '🌙', // clear sky night
    '02d': '⛅', // few clouds day
    '02n': '☁️', // few clouds night
    '03d': '☁️', // scattered clouds
    '03n': '☁️',
    '04d': '☁️', // broken clouds
    '04n': '☁️',
    '09d': '🌧️', // shower rain
    '09n': '🌧️',
    '10d': '🌦️', // rain day
    '10n': '🌧️', // rain night
    '11d': '⛈️', // thunderstorm
    '11n': '⛈️',
    '13d': '❄️', // snow
    '13n': '❄️',
    '50d': '🌫️', // mist
    '50n': '🌫️'
  };

  return iconMap[weatherCode] || '🌤️';
};

export const getWeatherDescription = (weatherMain) => {
  const descriptions = {
    'Clear': 'Clear sky',
    'Clouds': 'Cloudy',
    'Rain': 'Rainy',
    'Drizzle': 'Light rain',
    'Thunderstorm': 'Thunderstorm',
    'Snow': 'Snowy',
    'Mist': 'Misty',
    'Fog': 'Foggy',
    'Haze': 'Hazy'
  };

  return descriptions[weatherMain] || weatherMain;
};
