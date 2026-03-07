import { weatherCodeMap } from "../services/weatherCodes";

function WeatherCard({ weather }) {

  const weatherInfo =
    weatherCodeMap[weather.weathercode] || {
      label: "Unknown",
      icon: "❓"
    };

  return (
    <div style={{
      marginTop: 20,
      padding: 20,
      border: "1px solid #ccc",
      borderRadius: 8,
      width: 250
    }}>
      <h2>{weather.city}</h2>

      <h3 style={{ fontSize: 40 }}>
        {weatherInfo.icon}
      </h3>

      <p>{weatherInfo.label}</p>

      <p>Temperature: {weather.temperature}°C</p>
      <p>Wind Speed: {weather.windspeed} km/h</p>
    </div>
  );
}

export default WeatherCard;
