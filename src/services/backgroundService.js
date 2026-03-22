export const getWeatherBackground = (weathercode) => {

  if (weathercode === 0) {
    return "linear-gradient(145deg, #123777, #1f5cad)";
  }

  if (weathercode <= 3) {
    return "linear-gradient(145deg, #112c56, #214273)";
  }

  if (weathercode >= 51 && weathercode <= 65) {
    return "linear-gradient(145deg, #0f2446, #1d477c)";
  }

  if (weathercode >= 71) {
    return "linear-gradient(145deg, #1a3658, #2c6094)";
  }

  return "linear-gradient(145deg, #102d5a, #1f4d89)";
};
