import axios from "axios";

export async function fetchAddressFromCoords(
  lat: number,
  lon: number,
): Promise<string> {
  try {
    const response = await axios.get("https://geocode-maps.yandex.ru/1.x/", {
      params: {
        apikey: import.meta.env.VITE_GEOCODER_KEY,
        geocode: `${lon},${lat}`,
        format: "json",
      },
      timeout: 5000, // Ждем ответ не дольше 5 секунд
    });

    const geoObject =
      response.data?.response?.GeoObjectCollection?.featureMember?.[0]
        ?.GeoObject;

    if (!geoObject) {
      throw new Error("Яндекс не смог распознать адрес по этим координатам.");
    }

    return geoObject.metaDataProperty.GeocoderMetaData.text;
  } catch (error: unknown) {
    // Перехватываем сетевые и серверные ошибки Axios
    if (axios.isAxiosError(error)) {
      // Проверяем отсутствие интернета
      if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
        throw new Error(
          "Проблемы с сетью. Не удалось загрузить адрес от Яндекс.Карт.",
        );
      }
      // Обрабатываем блокировку ключа или ключ не тот
      if (error.response?.status === 403) {
        throw new Error(
          "Ошибка авторизации геокодера Яндекса (возможно, превышен лимит запросов).",
        );
      }
      // Любая другая ошибка сервера Яндекса
      if (error.response) {
        throw new Error(
          `Сервер геокодирования вернул ошибку (Код: ${error.response.status}).`,
        );
      }
    }
    // Прокидываем наверх обычную JS ошибку
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Не удалось определить адрес по координатам.");
  }
}
