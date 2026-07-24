import { ref, type Ref } from "vue";
import { fetchAddressFromCoords } from "@/api/yandex.service";
import { fetchLocationByIP } from "@/api/dadata.service";

type useLocationType = {
  latitude: Ref<number | null>;
  longitude: Ref<number | null>;
  address: Ref<string>;
  isLoading: Ref<boolean>;
  error: Ref<string | null, string | null>;
  initGeolocation: () => void;
};

export function useLocation(): useLocationType {
  const latitude = ref<number | null>(null);
  const longitude = ref<number | null>(null);
  const address = ref<string>("");
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Внутренний метод: запуск цепочки определения адреса
  async function resolveAddress() {
    try {
      if (latitude.value && longitude.value) {
        // Есть GPS координаты -> идем в Яндекс
        address.value = await fetchAddressFromCoords(
          latitude.value,
          longitude.value,
        );
      } else {
        // Координат нет (запрет GPS) -> идем в DaData по IP
        const temp = await fetchLocationByIP();
        if (temp) {
          latitude.value = +temp.lat;
          longitude.value = +temp.lon;
          address.value = temp.address;
        }
      }
    } catch (err) {
      // Шаг 3: Тотальный Fallback, если упал и Яндекс, и DaData
      address.value = "Запасной фоллбэк: Москва, Россия";
      if (err instanceof Error) {
        error.value = err.message;
      }
    }
  }

  function initGeolocation() {
    isLoading.value = true;
    error.value = null;

    if (!navigator.geolocation) {
      error.value = "Геолокация не поддерживается браузером";
      resolveAddress().finally(() => (isLoading.value = false));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        resolveAddress().finally(() => (isLoading.value = false));
      },
      (geoError) => {
        console.warn("GPS отклонен, переключаемся на IP:", geoError.message);
        resolveAddress().finally(() => (isLoading.value = false));
      },
    );
  }

  return { latitude, longitude, address, isLoading, error, initGeolocation };
}
