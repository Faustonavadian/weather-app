export const weatherCodeMap = {
  // Clear / Partly cloudy
  0:  { label: "Clear sky",         icon: "☀️"  },
  1:  { label: "Mainly clear",      icon: "🌤️" },
  2:  { label: "Partly cloudy",     icon: "⛅"  },
  3:  { label: "Overcast",          icon: "☁️"  },

  // Fog
  45: { label: "Fog",               icon: "🌫️" },
  48: { label: "Rime fog",          icon: "🌫️" },

  // Drizzle
  51: { label: "Light drizzle",     icon: "🌦️" },
  53: { label: "Drizzle",           icon: "🌦️" },
  55: { label: "Heavy drizzle",     icon: "🌧️" },
  56: { label: "Freezing drizzle",  icon: "🌨️" },
  57: { label: "Heavy freezing drizzle", icon: "🌨️" },

  // Rain
  61: { label: "Light rain",        icon: "🌧️" },
  63: { label: "Rain",              icon: "🌧️" },
  65: { label: "Heavy rain",        icon: "🌧️" },
  66: { label: "Freezing rain",     icon: "🌨️" },
  67: { label: "Heavy freezing rain", icon: "🌨️" },

  // Snow
  71: { label: "Light snow",        icon: "❄️"  },
  73: { label: "Snow",              icon: "❄️"  },
  75: { label: "Heavy snow",        icon: "❄️"  },
  77: { label: "Snow grains",       icon: "🌨️" },

  // Rain showers
  80: { label: "Light showers",     icon: "🌦️" },
  81: { label: "Showers",           icon: "🌧️" },
  82: { label: "Violent showers",   icon: "🌧️" },

  // Snow showers
  85: { label: "Light snow showers", icon: "🌨️" },
  86: { label: "Heavy snow showers", icon: "🌨️" },

  // Thunderstorm
  95: { label: "Thunderstorm",      icon: "⛈️"  },
  96: { label: "Thunderstorm with hail", icon: "⛈️" },
  99: { label: "Heavy thunderstorm with hail", icon: "⛈️" },
};
