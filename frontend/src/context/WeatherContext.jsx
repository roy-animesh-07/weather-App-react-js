
import { createContext, useContext, useState } from "react";

const WeatherContext = createContext(null);


export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

export const WeatherProvider = ( props) => {
  const [weather, setWeather] = useState([]);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {props.children}
    </WeatherContext.Provider>
  );
};
