# Weather Forecast App Documentation

## Overview

The Weather Forecast App is a modern, responsive React-based web application that provides comprehensive weather information for cities worldwide. Built with React 19, Vite, and React Router, it offers multiple views for weather data including current conditions, hourly forecasts, and 7-day forecasts.

## Features

### 🌍 Multi-View Weather Dashboard
- **Home Page**: Search for weather by city name or use geolocation
- **All Cities Weather**: View weather for cities from all continents simultaneously
- **Hourly Forecast**: 24-hour detailed weather predictions
- **Weekly Forecast**: 7-day weather outlook with daily summaries

### 🌡️ Temperature Unit Support
- Celsius (°C) - Default
- Fahrenheit (°F)
- Kelvin (K)
- Real-time unit conversion across all components

### 🔍 Smart Search & Location Features
- City name search with error handling
- Geolocation support for current location weather
- Add custom cities to the global weather view
- Default weather data for Toronto on app load

### 📱 User Experience
- Responsive design for all screen sizes
- Loading spinners with contextual messages
- Error handling with retry functionality
- Clean, modern UI with intuitive navigation

## Technical Architecture

### Frontend Stack
- **React 19.1.1**: Modern React with latest features
- **Vite 7.1.0**: Fast build tool and development server
- **React Router DOM 7.8.0**: Client-side routing
- **Axios 1.11.0**: HTTP client for API requests

### Project Structure
```
Weather_Forecast_App/
├── public/                     # Static assets
│   ├── cloud_11035225.png     # App icon
│   └── vite.svg               # Vite logo
├── src/
│   ├── components/            # React components
│   │   ├── AllCitiesWeather.jsx    # Global cities weather view
│   │   ├── ErrorMessage.jsx        # Error display component
│   │   ├── Home.jsx                # Main search and weather display
│   │   ├── HourlyForecast.jsx      # 24-hour forecast view
│   │   ├── LoadingSpinner.jsx      # Loading indicator
│   │   ├── TemperatureUnitSelector.jsx # Unit switcher
│   │   ├── WeatherCard.jsx         # Weather data display card
│   │   └── WeeklyForecast.jsx      # 7-day forecast view
│   ├── contexts/              # React contexts
│   │   └── TemperatureContext.jsx  # Global temperature unit state
│   ├── services/              # API services
│   │   └── weatherApi.js          # Weather API integration
│   ├── utils/                 # Utility functions
│   │   ├── helpers.js             # Date, time, temperature utilities
│   │   └── weatherIcons.js        # Weather icon mappings
│   ├── App.jsx               # Main app component with routing
│   ├── App.css               # Global styles
│   ├── index.css             # Base styles
│   └── main.jsx              # App entry point
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── eslint.config.js          # ESLint configuration
```

### Key Components

#### 1. App.jsx
- Main application component with React Router setup
- Navigation bar with active link highlighting
- Temperature unit selector in navigation
- Route definitions for all views

#### 2. Weather API Service (weatherApi.js)
- Integrates with RapidAPI Weather API (weather-api167.p.rapidapi.com)
- Handles data transformation from API response to app format
- Supports multiple API calls:
  - Current weather by city name
  - Current weather by coordinates (geolocation)
  - Hourly forecast (24 hours)
  - Weekly forecast (7 days)
- Error handling and data validation

#### 3. Temperature Context
- Global state management for temperature units
- Provides unit conversion throughout the app
- Default unit: Celsius

#### 4. Utility Functions (helpers.js)
- Date and time formatting
- Temperature conversion between C, F, and K
- Wind direction calculation
- String manipulation utilities

### Data Flow

1. **API Integration**: Weather data fetched from RapidAPI Weather service
2. **Data Transformation**: Raw API responses transformed to consistent format
3. **State Management**: React hooks and Context API for state management
4. **Component Rendering**: Weather data displayed through reusable components
5. **User Interactions**: Search, location access, unit switching, navigation

## Installation & Setup

### Prerequisites
- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher (comes with Node.js)
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge

### Step 1: Clone or Download the Project
```bash
# If using Git
git clone <repository-url>
cd Weather_Forecast_App

# Or download and extract the ZIP file
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required dependencies:
- React and React DOM
- React Router DOM for navigation
- Axios for API requests
- Vite for development and building
- ESLint for code linting

### Step 3: API Configuration
The app uses RapidAPI's Weather API service. The API key is already configured in the code, but for production use, you should:

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to the Weather API service
3. Replace the API key in `src/services/weatherApi.js`:
```javascript
const RAPIDAPI_KEY = 'your-api-key-here';
```

### Step 4: Start Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another available port).

### Step 5: Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Step 6: Preview Production Build
```bash
npm run preview
```

## Usage Guide

### Home Page
1. **Search by City**: Enter any city name and click "Search"
2. **Use Location**: Click "📍 Use My Location" to get weather for your current location
3. **View Details**: See comprehensive weather information including temperature, humidity, wind, and more

### All Cities Weather
1. **Global Overview**: View weather for cities from all continents
2. **Add Custom Cities**: Use the search box to add any city to the global view
3. **Remove Cities**: Click the "×" button on custom city tags to remove them
4. **Refresh Data**: Click "🔄 Refresh All" to update all weather data

### Hourly Forecast
1. **24-Hour View**: See weather predictions for the next 24 hours
2. **Detailed Information**: Temperature, weather conditions, and time for each hour
3. **Search Support**: Enter a city name to get hourly forecast for that location

### Weekly Forecast
1. **7-Day Outlook**: View weather predictions for the next week
2. **Daily Summaries**: High/low temperatures, average conditions, and weather icons
3. **City Search**: Get weekly forecasts for any city worldwide

### Temperature Units
- Click the temperature unit selector in the navigation bar
- Choose between Celsius (°C), Fahrenheit (°F), or Kelvin (K)
- All temperatures throughout the app update instantly

## API Information

### Weather Data Source
- **Provider**: RapidAPI Weather API (weather-api167.p.rapidapi.com)
- **Data Format**: JSON
- **Update Frequency**: Real-time data
- **Coverage**: Global cities and coordinates

### API Endpoints Used
- `/api/weather/forecast` - Current weather and forecasts
- Supports both city names and coordinates (lat, lon)
- Returns 3-hour interval data that's processed for hourly and daily views

## Browser Compatibility

- **Chrome**: Version 88+
- **Firefox**: Version 85+
- **Safari**: Version 14+
- **Edge**: Version 88+

## Performance Features

- **Fast Development**: Vite provides instant hot module replacement
- **Optimized Builds**: Production builds are minified and optimized
- **Lazy Loading**: Components load efficiently
- **Error Boundaries**: Graceful error handling prevents app crashes
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Troubleshooting

### Common Issues

1. **API Errors**: 
   - Check internet connection
   - Verify API key is valid
   - Ensure city name is spelled correctly

2. **Geolocation Not Working**:
   - Enable location permissions in browser
   - Use HTTPS (required for geolocation)
   - Try searching by city name instead

3. **Build Errors**:
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version (16+ required)
   - Clear npm cache: `npm cache clean --force`

4. **Development Server Issues**:
   - Check if port 5173 is available
   - Try `npm run dev -- --port 3000` to use a different port

### Getting Help

1. Check the browser console for error messages
2. Verify all dependencies are installed correctly
3. Ensure you're using a supported Node.js version
4. Check network connectivity for API requests

## Future Enhancements

Potential improvements for the application:
- Weather maps integration
- Push notifications for weather alerts
- Historical weather data
- Weather widgets for embedding
- Offline support with cached data
- Multiple language support
- Dark/light theme toggle
- Weather-based recommendations

## License

This project is open source and available under standard web development practices. The weather data is provided by RapidAPI's Weather service and subject to their terms of use.

---

**Note**: This application is designed for educational and personal use. For commercial deployment, ensure you have appropriate API subscriptions and follow all service terms of use.
