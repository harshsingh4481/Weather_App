import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    try {
      setError('');
      const response = await axios.get(
        `https://weather-app-backend-one-brown.vercel.app/weather/${city}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <h1>Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="city-input"
        />
        <button onClick={fetchWeatherData} className="search-button">
          Get Weather
        </button>

        {error && <p className="error-message">{error}</p>}

        {weatherData && (
          <>
            <WeatherCard weather={weatherData.current} title="Current Weather" />
            <h2>5-Day Forecast</h2>
            <div className="forecast-container">
              {weatherData.forecast.list.map((item, index) => (
                <WeatherCard key={index} weather={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
