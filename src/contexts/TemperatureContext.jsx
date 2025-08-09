import React, { createContext, useContext, useState } from 'react';

const TemperatureContext = createContext();

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
};

export const TemperatureProvider = ({ children }) => {
  const [unit, setUnit] = useState('C'); // Default to Celsius since API returns metric

  const value = {
    unit,
    setUnit,
  };

  return (
    <TemperatureContext.Provider value={value}>
      {children}
    </TemperatureContext.Provider>
  );
};
