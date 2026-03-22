export const getCoordinates = async (city) => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  const [firstResult] = data.results;

  return {
    latitude: firstResult.latitude,
    longitude: firstResult.longitude,
    name: firstResult.name,
    country: firstResult.country,
  };
};

export const getWeather = async (latitude, longitude) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather data");
  }

  const data = await response.json();

  if (!data.current) {
    throw new Error("Weather data is unavailable");
  }

  return {
    temperature: data.current.temperature_2m,
    windspeed: data.current.wind_speed_10m,
    weathercode: data.current.weather_code,
    humidity: data.current.relative_humidity_2m,
    precipitation: data.current.precipitation,
  };
};

export const getCityFromCoordinates = async (latitude, longitude) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );

  const data = await response.json();

  const city =
    data.address.city ||
    data.address.town ||
    data.address.village ||
    data.address.state ||
    "Unknown location";

  const country = data.address.country || "";

  return `${city}${country ? ", " + country : ""}`;
};
