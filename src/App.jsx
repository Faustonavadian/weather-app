import { useState } from "react";
import { getWeatherBackground } from "./services/backgroundService";
import { getCoordinates, getWeather } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const background = weather
  ? getWeatherBackground(weather.weathercode)
  : "linear-gradient(135deg, #4facfe, #00f2fe)";


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
    <div
      style={{
        background: background,
        padding: 40,
        borderRadius: 12,
        width: 350,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        textAlign: "center"
      }}
    >
      <h1>The Weather App</h1>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchWeather();
            }
          }}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={searchWeather}
          style={{
            padding: "10px 15px",
            borderRadius: 6,
            border: "none",
            background: "#4facfe",
            color: "white",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {loading && <p style={{ marginTop: 20 }}>Loading weather...</p>}

      {weather && !loading && <WeatherCard weather={weather} />}

    </div>
  );
}

export default App;
