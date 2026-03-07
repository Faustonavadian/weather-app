import { useState } from "react";
import { getCoordinates, getWeather } from "./services/weatherService";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchWeather = async () => {
    try {
      setLoading(true);

      const coords = await getCoordinates(city);
      const weatherData = await getWeather(coords.latitude, coords.longitude);

      setWeather({ ...weatherData, city: coords.name });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={searchWeather}>Search</button>

      {loading && <p>Loading weather...</p>}

      {weather && !loading && (
        <div style={{ marginTop: 20 }}>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Wind Speed: {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
