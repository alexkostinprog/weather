// Градусы направления ветра в текстовое описание со стрелкой

export function getWindDirection(deg: number): string {
  // Используем остаток от деления, чтобы нормализовать градусы, если придёт больше 360
  const normalizedDeg = ((deg % 360) + 360) % 360;

  if (normalizedDeg >= 337.5 || normalizedDeg < 22.5) return "⬇️ С";
  if (normalizedDeg >= 22.5 && normalizedDeg < 67.5) return "↙️ СВ";
  if (normalizedDeg >= 67.5 && normalizedDeg < 112.5) return "⬅️ В";
  if (normalizedDeg >= 112.5 && normalizedDeg < 157.5) return "↖️ ЮВ";
  if (normalizedDeg >= 157.5 && normalizedDeg < 202.5) return "⬆️ Ю";
  if (normalizedDeg >= 202.5 && normalizedDeg < 247.5) return "↗️ ЮЗ";
  if (normalizedDeg >= 247.5 && normalizedDeg < 292.5) return "➡️ З";
  return "↘️ СЗ";
}

export function getWeatherEmoji(iconCode: string): string {
  const mapping: Record<string, string> = {
    "01d": "☀️",
    "01n": "🌙", // Ясно
    "02d": "🌤️",
    "02n": "☁️", // Малооблачно
    "03d": "⛅",
    "03n": "☁️", // Облачно
    "04d": "☁️",
    "04n": "☁️", // Пасмурно
    "09d": "🌧️",
    "09n": "🌧️", // Ливень
    "10d": "🌦️",
    "10n": "🌧️", // Дождь
    "11d": "⛈️",
    "11n": "⛈️", // Гроза
    "13d": "❄️",
    "13n": "❄️", // Снег
    "50d": "🌫️",
    "50n": "🌫️", // Туман
  };

  return mapping[iconCode] || "🌤️"; // Дефолтный эмодзи, если код не найден
}
