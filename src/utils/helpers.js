// Date and time formatting utilities
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatHour = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    hour12: true
  });
};

export const getDayName = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const getShortDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

// Temperature conversion
export const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9/5) + 32);
};

export const celsiusToKelvin = (celsius) => {
  return Math.round(celsius + 273.15);
};

export const fahrenheitToCelsius = (fahrenheit) => {
  return Math.round((fahrenheit - 32) * 5/9);
};

export const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
};

export const convertTemperature = (temp, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return Math.round(temp);
  
  // Convert to Celsius first if needed
  let celsius = temp;
  if (fromUnit === 'F') {
    celsius = fahrenheitToCelsius(temp);
  } else if (fromUnit === 'K') {
    celsius = kelvinToCelsius(temp);
  }
  
  // Convert from Celsius to target unit
  switch (toUnit) {
    case 'F':
      return celsiusToFahrenheit(celsius);
    case 'K':
      return celsiusToKelvin(celsius);
    case 'C':
    default:
      return Math.round(celsius);
  }
};

export const getTemperatureUnit = (unit) => {
  switch (unit) {
    case 'F':
      return '°F';
    case 'K':
      return 'K';
    case 'C':
    default:
      return '°C';
  }
};

export const roundTemperature = (temp) => {
  return Math.round(temp);
};

// Wind direction
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
