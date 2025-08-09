import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { TemperatureProvider } from './contexts/TemperatureContext.jsx';
import TemperatureUnitSelector from './components/TemperatureUnitSelector.jsx';
import Home from './components/Home.jsx';
import AllCitiesWeather from './components/AllCitiesWeather.jsx';
import HourlyForecast from './components/HourlyForecast.jsx';
import WeeklyForecast from './components/WeeklyForecast.jsx';

function App() {
  return (
    <TemperatureProvider>
      <Router>
        <nav className="navigation">
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
            <NavLink to="/all-cities" className={({ isActive }) => (isActive ? 'active' : '')}>
              All Cities
            </NavLink>
            <NavLink to="/hourly" className={({ isActive }) => (isActive ? 'active' : '')}>
              Hourly Forecast
            </NavLink>
            <NavLink to="/weekly" className={({ isActive }) => (isActive ? 'active' : '')}>
              7-Day Forecast
            </NavLink>
          </div>
          <TemperatureUnitSelector />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-cities" element={<AllCitiesWeather />} />
          <Route path="/hourly" element={<HourlyForecast />} />
          <Route path="/weekly" element={<WeeklyForecast />} />
        </Routes>
      </Router>
    </TemperatureProvider>
  );
}

export default App;
