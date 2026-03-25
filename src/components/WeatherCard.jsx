import { useState } from "react";
import { weatherCodeMap } from "../services/weatherCodes";

function WeatherCard({ weather }) {
  const [unit, setUnit] = useState("C");

  const weatherInfo =
    weatherCodeMap[weather.weathercode] || {
      label: "Unknown",
      icon: "❓"
    };

  const formatMetric = (value, suffix) => {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return "--";
    }

    return `${value}${suffix}`;
  };

  const displayTemp =
    unit === "C"
      ? Math.round(weather.temperature)
      : Math.round((weather.temperature * 9) / 5 + 32);

  return (
    <div className="weather-card">
      <div className="weather-core">
        <h2 className="weather-city">{weather.city}</h2>

        <div className="weather-icon">{weatherInfo.icon}</div>

        <div className="weather-temp">
          {displayTemp}
          <span className="weather-unit">°{unit}</span>
          <button
            className="unit-toggle"
            type="button"
            aria-label={`Switch to °${unit === "C" ? "F" : "C"}`}
            onClick={() => setUnit((u) => (u === "C" ? "F" : "C"))}
          >
            °{unit === "C" ? "F" : "C"}
          </button>
        </div>

        <p className="weather-label">{weatherInfo.label}</p>
      </div>

      <div className="weather-metrics-grid">
        <article className="weather-metric-card">
          <p className="weather-metric-label">Wind</p>
          <p className="weather-metric-value">{formatMetric(weather.windspeed, " km/h")}</p>
        </article>

        <article className="weather-metric-card">
          <p className="weather-metric-label">Humidity</p>
          <p className="weather-metric-value">{formatMetric(weather.humidity, "%")}</p>
        </article>

        <article className="weather-metric-card">
          <p className="weather-metric-label">Precipitation</p>
          <p className="weather-metric-value">{formatMetric(weather.precipitation, " mm")}</p>
        </article>
      </div>
    </div>
  );
}

export default WeatherCard;
