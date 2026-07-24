import axios from "axios";

export type WindData = {
  speed: number;
  deg?: number;
  gust?: number;
};

export type fetchWeatherType = {
  temp: number;
  description: string;
  wind: WindData;
  icon: string;
  humidity: number;
};

export async function fetchWeatherFromAPI(
  lat: number | null,
  lon: number | null,
): Promise<fetchWeatherType | undefined> {
  const API_KEY_WEATHER = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric&lang=ru`;

  try {
    const response = await axios.get(url, { timeout: 7000 });
    if (response.status !== 200) {
      throw new Error(`Ошибка сети: ${response.status}`);
    }
    const data = response.data;

    // console.log(
    //   `Погода в ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`,
    // );
    return {
      temp: data.main.temp,
      description: data.weather[0].description,
      wind: data.wind,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Проверяем тотальное отсутствие интернета
      if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
        throw new Error(
          "Проблемы с интернет-соединением. Проверьте подключение к сети.",
        );
      }
      // Обрабатываем долгий ответ от сервера (Таймаут)
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        throw new Error(
          "Сервер погоды отвечает слишком долго. Попробуйте позже.",
        );
      }
      // Обрабатываем ошибки самого API (например, город не найден — 404)
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error(
            "Запрашиваемый город не найден в базе данных погоды.",
          );
        }
        if (error.response.status === 401) {
          throw new Error("Ошибка авторизации: неверный API-ключ погоды.");
        }
        throw new Error(
          `Ошибка сервера погоды (Код: ${error.response.status})`,
        );
      }
    }
    // Если это какая-то другая обычная JS ошибка (не связанная с сетью)
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Произошла непредвиденная ошибка");
  }
}
