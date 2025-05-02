import React, { useState } from 'react';
import './WeatherApp.css'; // Your CSS file

const apiKey = 'bfe6b10505904951447c39ea658cf12b';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function WeatherApp() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!location.trim()) {
      setError('Please enter a valid location.');
      return;
    }

    fetchWeather(location);
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const res = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
      if (!res.ok) throw new Error('City not found.');

      const data = await res.json();
      setWeatherData(data);
      updateBackground(data.weather[0].main);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const updateBackground = (condition) => {
    const images = {
      clear: 'clearsky.jpeg',
      clouds: 'cloudysky.jpeg',
      rain: 'rainy.jpg',
      drizzle: 'drizzle.jpg',
      snow: 'snow.webp',
      thunderstorm: 'thunderstorm.jpg',
      default: 'def.avif',
    };
    const img = images[condition.toLowerCase()] || images.default;
    document.body.style.backgroundImage = `url(${img})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  };

  const getWeatherEmoji = (condition) => {
    switch (condition) {
      case 'Clear':
        return '🌞'; // Sun emoji for clear sky
      case 'Clouds':
        return '☁️'; // Cloud emoji for cloudy sky
      case 'Rain':
        return '🌧️'; // Rain emoji for rain
      case 'Drizzle':
        return '🌦️'; // Drizzle emoji for drizzle
      case 'Snow':
        return '❄️'; // Snow emoji for snow
      case 'Thunderstorm':
        return '⛈️'; // Thunderstorm emoji for thunderstorm
      default:
        return '🌈'; // Default rainbow for unknown conditions
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <div id="loader">Loading...</div>}
      {error && <div id="errorMessage" style={{ color: 'red' }}>{error}</div>}

      {weatherData && (
        <div className="weather-info">
          <h2 id="location">{weatherData.name} {getWeatherEmoji(weatherData.weather[0].main)}</h2>
          <p id="temperature">{Math.round(weatherData.main.temp)}°C</p>
          <p id="description">{capitalizeFirstLetter(weatherData.weather[0].description)}</p>
          <p id="humidity">Humidity: {weatherData.main.humidity}%</p>
          <p id="precipitation">
            {weatherData.rain?.['1h']
              ? `Rainfall: ${weatherData.rain['1h']} mm in last hour`
              : weatherData.snow?.['1h']
              ? `Snowfall: ${weatherData.snow['1h']} mm in last hour`
              : 'No precipitation'}
          </p>
          <p id="windSpeed">Wind Speed: {weatherData.wind.speed} m/s</p>
          <p id="pressure">Pressure: {weatherData.main.pressure} hPa</p>
          <p id="sunrise">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p id="sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
          <p id="uvIndex">UV Index: N/A</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
