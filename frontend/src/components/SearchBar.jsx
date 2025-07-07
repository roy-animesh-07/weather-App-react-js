import React, { useState } from "react";
import { useWeather } from "../context/WeatherContext";

const SearchBar = () => {
  const [query, setQuery] = useState("london");
  const [suggestions, setSuggestions] = useState([]);
  const weather = useWeather();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const suggestUrl = `http://localhost:8000/api/getWeather/search/${value}`;
    fetch(suggestUrl)
      .then(res => res.json())
      .then(res => setSuggestions(res))
      .catch(err => console.error("Suggestions fetch error", err));
  };

  const getWeather = async () => {
    const weatherUrl = `http://localhost:8000/api/getWeather/place/${query}`;
    const forecastUrl = `http://localhost:8000/api/getForecast/place/${query}`;

    try {
      const [current, forecast] = await Promise.all([
        fetch(weatherUrl).then(res => res.json()),
        fetch(forecastUrl).then(res => res.json())
      ]);
      weather.setWeather([current, forecast]);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  return (
    <div className="w-[70%] max-w-[500px]">
      <div className="flex">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
        />
        <button
          onClick={getWeather}
          className="bg-blue-400 rounded-2xl border shadow-2xl text-white px-5 hover:cursor-pointer h-10"
        >
          Search
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="z-10 w-full bg-white border border-gray-300 rounded-lg shadow mt-1">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(item.name);
                setSuggestions([]);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
