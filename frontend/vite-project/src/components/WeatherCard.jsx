import React from 'react';

const WeatherCard = ({ weather, title }) => {
  if (!weather) {
    return null;
  }

  const temperature = Math.round(weather.main.temp - 273.15); // Convert from Kelvin to Celsius
  const date = new Date(weather.dt * 1000).toLocaleDateString(); // Convert timestamp to date

  return (
    <div style={cardStyle}>
      {title && <h2>{title}</h2>}
      <p>{date}</p>
      <p>{weather.weather[0].description}</p>
      <p>{temperature}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

// Basic styles for the weather card
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '20px',
  textAlign: 'center',
  width: '250px',
  margin: '20px auto',
  backgroundColor: '#f9f9f9',
};

export default WeatherCard;
