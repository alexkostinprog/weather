import { ref } from "vue";
import {
  fetchWeatherFromAPI,
  type fetchWeatherType,
} from "@/api/weather.service";

export function useWeather() {
  const weatherData = ref<fetchWeatherType | undefined>(undefined);
  const isWeatherLoading = ref(false);
  const weatherError = ref("");

  async function loadWeather(lat: number | null, lon: number | null) {
    isWeatherLoading.value = true;
    try {
      weatherData.value = await fetchWeatherFromAPI(lat, lon);
    } catch (err: unknown) {
      weatherData.value = undefined;
      weatherError.value =
        err instanceof Error ? err.message : "Произошла непредвиденная ошибка";
    } finally {
      isWeatherLoading.value = false;
    }
  }

  return { weatherData, isWeatherLoading, loadWeather, weatherError };
}
