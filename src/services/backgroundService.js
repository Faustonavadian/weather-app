export const getWeatherBackground = (weathercode) => {
  // Clear sky — warm yellow/amber accent top-left
  if (weathercode === 0) {
    return `
      radial-gradient(circle at 12% 12%, rgba(255, 210, 55, 0.30), transparent 40%),
      radial-gradient(circle at 85% 10%, rgba(29, 73, 148, 0.25), transparent 42%),
      linear-gradient(145deg, #0d1e3b 0%, #0f2f62 46%, #0a3060 100%)
    `;
  }

  // Partly cloudy — faint warm tint fading to blue
  if (weathercode <= 3) {
    return `
      radial-gradient(circle at 12% 12%, rgba(190, 165, 80, 0.18), transparent 40%),
      radial-gradient(circle at 85% 10%, rgba(29, 73, 148, 0.25), transparent 42%),
      linear-gradient(145deg, #0a1a33 0%, #0d2850 46%, #091f45 100%)
    `;
  }

  // Fog — muted grey-blue veil
  if (weathercode >= 45 && weathercode <= 48) {
    return `
      radial-gradient(circle at 50% 0%, rgba(140, 160, 185, 0.22), transparent 50%),
      linear-gradient(145deg, #0a1422 0%, #131d2e 46%, #141e30 100%)
    `;
  }

  // Drizzle / Rain — deep cool blue
  if (weathercode >= 51 && weathercode <= 65) {
    return `
      radial-gradient(circle at 18% 10%, rgba(40, 90, 200, 0.28), transparent 45%),
      radial-gradient(circle at 80% 85%, rgba(20, 55, 130, 0.22), transparent 40%),
      linear-gradient(145deg, #040c1c 0%, #081a3a 46%, #091e45 100%)
    `;
  }

  // Snow — icy pale-blue accent
  if (weathercode >= 71 && weathercode <= 77) {
    return `
      radial-gradient(circle at 20% 15%, rgba(145, 200, 255, 0.26), transparent 45%),
      linear-gradient(145deg, #080f1e 0%, #0d1e3a 46%, #0e2245 100%)
    `;
  }

  // Thunderstorm — electric violet tint
  if (weathercode >= 95) {
    return `
      radial-gradient(circle at 30% 20%, rgba(105, 60, 210, 0.28), transparent 45%),
      linear-gradient(145deg, #05080f 0%, #0a0e24 46%, #0c1230 100%)
    `;
  }

  // Default (showers / mixed)
  return `
    radial-gradient(circle at 14% 20%, rgba(54, 110, 210, 0.35), transparent 45%),
    radial-gradient(circle at 86% 10%, rgba(29, 73, 148, 0.34), transparent 42%),
    linear-gradient(145deg, #030a18 0%, #071f45 46%, #0a315d 100%)
  `;
};
