import { useState } from "react";
import { getCoordinates, getWeather } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";

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

      {weather && !loading && <WeatherCard weather={weather} />}

    </div>
  );
}

export default App;
