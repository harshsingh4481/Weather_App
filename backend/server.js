const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Route to get weather data for a city (current weather + 5-day forecast)
app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  try {
    // Fetch current weather
    const currentWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    // Fetch 5-day forecast
    const forecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    );

    res.json({
      current: currentWeather.data,
      forecast: forecast.data,
    });
  } catch (error) {
    res.status(404).json({ message: 'City not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
