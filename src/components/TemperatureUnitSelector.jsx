import React from 'react';
import { useTemperature } from '../contexts/TemperatureContext.jsx';

const TemperatureUnitSelector = () => {
  const { unit, setUnit } = useTemperature();

  const units = [
    { value: 'C', label: '°C', name: 'Celsius' },
    { value: 'F', label: '°F', name: 'Fahrenheit' },
    { value: 'K', label: 'K', name: 'Kelvin' }
  ];

  return (
    <div className="temperature-unit-selector">
      <span className="unit-label">Temperature:</span>
      <div className="unit-buttons">
        {units.map((unitOption) => (
          <button
            key={unitOption.value}
            className={`unit-button ${unit === unitOption.value ? 'active' : ''}`}
            onClick={() => setUnit(unitOption.value)}
            title={unitOption.name}
          >
            {unitOption.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemperatureUnitSelector;
