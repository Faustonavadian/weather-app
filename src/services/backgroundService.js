/**
 * Returns { gradient, glowA, glowB } for a given WMO weather code.
 * gradient — full CSS background value applied to document.body
 * glowA/glowB — colors for the two ambient blobs (body::before / body::after)
 */
export const getWeatherBackground = (weathercode) => {
  // Clear sky — warm golden-amber sun feel
  if (weathercode === 0) {
    return {
      gradient: `
        radial-gradient(circle at 14% 14%, rgba(255, 200, 45, 0.55), transparent 40%),
        radial-gradient(circle at 82% 10%, rgba(80, 145, 255, 0.35), transparent 38%),
        linear-gradient(150deg, #0d2040 0%, #1a4080 48%, #0e305a 100%)
      `,
      glowA: "rgba(220, 165, 28, 0.42)",
      glowB: "rgba(50, 118, 220, 0.32)",
    };
  }

  // Mainly clear / Partly cloudy — muted warm tint
  if (weathercode <= 2) {
    return {
      gradient: `
        radial-gradient(circle at 14% 14%, rgba(200, 162, 50, 0.38), transparent 42%),
        radial-gradient(circle at 80% 12%, rgba(50, 100, 195, 0.30), transparent 42%),
        linear-gradient(150deg, #0a1e3c 0%, #102550 48%, #0b2448 100%)
      `,
      glowA: "rgba(185, 145, 32, 0.30)",
      glowB: "rgba(40, 88, 180, 0.28)",
    };
  }

  // Overcast — flat grey-blue, no warmth
  if (weathercode === 3) {
    return {
      gradient: `
        radial-gradient(circle at 50% 5%, rgba(130, 150, 175, 0.45), transparent 55%),
        radial-gradient(circle at 20% 80%, rgba(80, 100, 130, 0.25), transparent 45%),
        linear-gradient(160deg, #080e18 0%, #0e1724 50%, #111c2e 100%)
      `,
      glowA: "rgba(110, 130, 158, 0.38)",
      glowB: "rgba(75, 95, 125, 0.30)",
    };
  }

  // Fog / Depositing rime fog — diffuse silver veil
  if (weathercode >= 45 && weathercode <= 48) {
    return {
      gradient: `
        radial-gradient(circle at 50% 8%, rgba(170, 185, 205, 0.55), transparent 55%),
        linear-gradient(155deg, #0a1220 0%, #141c2c 50%, #0f1828 100%)
      `,
      glowA: "rgba(155, 172, 192, 0.38)",
      glowB: "rgba(120, 142, 165, 0.30)",
    };
  }

  // Drizzle / Light-to-heavy rain — deep steel blue
  if (weathercode >= 51 && weathercode <= 65) {
    return {
      gradient: `
        radial-gradient(circle at 18% 10%, rgba(28, 78, 205, 0.58), transparent 45%),
        radial-gradient(circle at 82% 82%, rgba(14, 48, 145, 0.42), transparent 40%),
        linear-gradient(155deg, #02070f 0%, #050c20 48%, #071428 100%)
      `,
      glowA: "rgba(22, 68, 185, 0.50)",
      glowB: "rgba(10, 42, 132, 0.42)",
    };
  }

  // Snow — icy pale blue-white
  if (weathercode >= 71 && weathercode <= 77) {
    return {
      gradient: `
        radial-gradient(circle at 28% 10%, rgba(178, 225, 255, 0.58), transparent 48%),
        radial-gradient(circle at 72% 85%, rgba(138, 195, 242, 0.32), transparent 40%),
        linear-gradient(155deg, #060c1a 0%, #0b1c36 50%, #0c1e3c 100%)
      `,
      glowA: "rgba(158, 210, 255, 0.48)",
      glowB: "rgba(118, 180, 232, 0.38)",
    };
  }

  // Thunderstorm — near-black with electric violet
  if (weathercode >= 95) {
    return {
      gradient: `
        radial-gradient(circle at 28% 18%, rgba(118, 52, 245, 0.58), transparent 45%),
        radial-gradient(circle at 72% 14%, rgba(200, 210, 25, 0.14), transparent 30%),
        linear-gradient(155deg, #02030a 0%, #050710 50%, #07091c 100%)
      `,
      glowA: "rgba(98, 38, 222, 0.52)",
      glowB: "rgba(58, 18, 162, 0.42)",
    };
  }

  // Default — showers / mixed precipitation
  return {
    gradient: `
      radial-gradient(circle at 16% 14%, rgba(42, 98, 225, 0.52), transparent 45%),
      radial-gradient(circle at 86% 12%, rgba(24, 68, 168, 0.44), transparent 42%),
      linear-gradient(155deg, #02080f 0%, #061328 48%, #091c3e 100%)
    `,
    glowA: "rgba(38, 88, 202, 0.46)",
    glowB: "rgba(22, 62, 165, 0.40)",
  };
};
