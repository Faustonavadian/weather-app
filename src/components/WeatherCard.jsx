import { weatherCodeMap } from "../services/weatherCodes";

function WeatherCard({ weather }) {

  const weatherInfo =
    weatherCodeMap[weather.weathercode] || {
      label: "Unknown",
      icon: "❓"
    };

  return (
    <div
      style={{
        marginTop: 25,
        padding: 20,
        borderRadius: 10,
        background: "#f5f7fa"
      }}
    >
      <h2>{weather.city}</h2>

      <div style={{ fontSize: 50 }}>
        {weatherInfo.icon}
      </div>

      <p style={{ margin: 5 }}>{weatherInfo.label}</p>

      <h3>{weather.temperature}°C</h3>

      <p>Wind {weather.windspeed} km/h</p>
    </div>
  );
}

export default WeatherCard;
