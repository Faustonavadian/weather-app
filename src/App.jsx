import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getWeatherBackground } from "./services/backgroundService";
import { getCoordinates, getWeather, getCityFromCoordinates } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [errorMessage, setErrorMessage] = useState("");

  const searchContainerRef = useRef(null);
  const suggestionCacheRef = useRef(new Map());

  const weatherBg = weather ? getWeatherBackground(weather.weathercode) : null;
  const background = weatherBg ? weatherBg.gradient : null;

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  useEffect(() => {
    if (weatherBg) {
      document.body.style.background = weatherBg.gradient;
      document.body.style.setProperty("--glow-a", weatherBg.glowA);
      document.body.style.setProperty("--glow-b", weatherBg.glowB);
    }
  }, [background]);

  const searchWeatherByCity = async (inputCity = city) => {
    const query = inputCity.trim();
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      setShowSuggestions(false);

      const coords = await getCoordinates(query);
      const weatherData = await getWeather(coords.latitude, coords.longitude);

      const displayName = coords.country ? `${coords.name}, ${coords.country}` : coords.name;

      setWeather({ ...weatherData, city: displayName });
      setCity(displayName);
    } catch (error) {
      setErrorMessage(error.message || "Unable to fetch weather right now.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocationWeather = () => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const weatherData = await getWeather(latitude, longitude);
          const cityName = await getCityFromCoordinates(latitude, longitude);

          setWeather({
            ...weatherData,
            city: cityName
          });
          setCity(cityName);
        } catch (error) {
          setErrorMessage(error.message || "Unable to fetch weather for your location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setErrorMessage("Location access was denied. Search for a city to continue.");
      }
    );
  };

  const fetchSuggestions = async (value, signal) => {
    const query = value.trim();
    if (query.length < 2) {
      setSuggestions([]);
      setSuggestionsLoading(false);
      return;
    }

    const cacheKey = query.toLowerCase();
    if (suggestionCacheRef.current.has(cacheKey)) {
      setSuggestions(suggestionCacheRef.current.get(cacheKey));
      setSuggestionsLoading(false);
      return;
    }

    try {
      setSuggestionsLoading(true);

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6`,
        { signal }
      );

      if (!response.ok) {
        throw new Error("Unable to fetch suggestions.");
      }

      const data = await response.json();

      if (signal.aborted) {
        return;
      }

      if (!data.results || data.results.length === 0) {
        setSuggestions([]);
        suggestionCacheRef.current.set(cacheKey, []);
        return;
      }

      const formatted = data.results.map((item) => ({
        name: item.country ? `${item.name}, ${item.country}` : item.name,
        latitude: item.latitude,
        longitude: item.longitude
      }));

      setSuggestions(formatted);
      suggestionCacheRef.current.set(cacheKey, formatted);
    } catch (error) {
      if (error.name !== "AbortError") {
        setSuggestions([]);
      }
    } finally {
      if (!signal.aborted) {
        setSuggestionsLoading(false);
      }
    }
  };

  const handleSuggestionSelect = async (suggestion) => {
    setCity(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);

    try {
      setLoading(true);
      setErrorMessage("");

      const weatherData = await getWeather(suggestion.latitude, suggestion.longitude);

      setWeather({
        ...weatherData,
        city: suggestion.name
      });
    } catch (error) {
      setErrorMessage(error.message || "Unable to fetch weather right now.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      if (suggestions.length === 0) {
        return;
      }

      event.preventDefault();
      setShowSuggestions(true);
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
      return;
    }

    if (event.key === "ArrowUp") {
      if (suggestions.length === 0) {
        return;
      }

      event.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
      return;
    }

    if (event.key === "Escape") {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (showSuggestions && activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
        handleSuggestionSelect(suggestions[activeSuggestionIndex]);
        return;
      }

      searchWeatherByCity();
    }
  };

  useEffect(() => {
    if (!showSuggestions) return;

    const query = city.trim();
    if (query.length < 2) {
      setSuggestions([]);
      setSuggestionsLoading(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      fetchSuggestions(query, controller.signal);
    }, 250);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [city, showSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchContainerRef.current?.contains(event.target)) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="app-shell" style={{ "--weather-gradient": background }}>
      <div className="app-shell-bg" aria-hidden="true" />
      <div className="app-content">
        <h1 className="app-title"> The Weather App</h1>
        <p className="app-subtitle">Real-time weather with smart city search</p>

        <div className="search-row" ref={searchContainerRef}>
          <div className="search-input-wrap">
            <input
              className={`city-input${city ? " city-input--has-value" : ""}`}
              type="text"
              placeholder="Search for a city..."
              value={city}
              onKeyDown={handleInputKeyDown}
              onChange={(event) => {
                const nextValue = event.target.value;

                setCity(nextValue);
                setShowSuggestions(nextValue.trim().length >= 2);
                setActiveSuggestionIndex(-1);

                if (nextValue.trim().length < 2) {
                  setSuggestions([]);
                }
              }}
              aria-label="Search city"
              aria-autocomplete="list"
            />

            {city && (
              <button
                className="clear-button"
                type="button"
                aria-label="Clear search"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setCity("");
                  setWeather(null);
                  setErrorMessage("");
                  setSuggestions([]);
                  setShowSuggestions(false);
                  setActiveSuggestionIndex(-1);
                }}
              >
                ×
              </button>
            )}

            {showSuggestions && city.trim().length >= 2 && (
              <div className="suggestions-box" role="listbox" aria-label="City suggestions">
                {suggestionsLoading && (
                  <p className="suggestion-state">Finding matching cities...</p>
                )}

                {!suggestionsLoading && suggestions.length === 0 && (
                  <p className="suggestion-state">No cities found.</p>
                )}

                {!suggestionsLoading &&
                  suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion.name}-${index}`}
                      type="button"
                      role="option"
                      aria-selected={index === activeSuggestionIndex}
                      className={`suggestion-item ${index === activeSuggestionIndex ? "active" : ""}`}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setActiveSuggestionIndex(index)}
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      {suggestion.name}
                    </button>
                  ))}
              </div>
            )}
          </div>

          <button
            className="search-button"
            onClick={() => searchWeatherByCity()}
            disabled={loading || !city.trim()}
          >
            Search
          </button>
        </div>

        {errorMessage && !weather && <p className="error-text">{errorMessage}</p>}

        {loading && <p className="status-text">Loading weather...</p>}

        {weather && !loading && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
