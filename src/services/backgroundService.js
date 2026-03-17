export const getWeatherBackground = (weathercode) => {

  if (weathercode === 0) {
    return "linear-gradient(135deg, #56ccf2, #2f80ed)";
  }

  if (weathercode <= 3) {
    return "linear-gradient(135deg, #bdc3c7, #2c3e50)";
  }

  if (weathercode >= 51 && weathercode <= 65) {
    return "linear-gradient(135deg, #4b79a1, #283e51)";
  }

  if (weathercode >= 71) {
    return "linear-gradient(135deg, #e6dada, #274046)";
  }

  return "linear-gradient(135deg, #4facfe, #00f2fe)";
};
