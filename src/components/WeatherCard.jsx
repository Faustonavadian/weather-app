function WeatherCard({ weather }) {
  return (
    <div style={{
      marginTop: 20,
      padding: 20,
      border: "1px solid #ccc",
      borderRadius: 8,
      width: 250
    }}>
      <h2>{weather.city}</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Wind Speed: {weather.windspeed} km/h</p>
    </div>
  );
}

export default WeatherCard;
