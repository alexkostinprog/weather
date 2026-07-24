import axios from "axios";

type fetchLocationByIPType = {
  lat: number;
  lon: number;
  address: string;
};

export async function fetchLocationByIP(): Promise<
  fetchLocationByIPType | undefined
> {
  try {
    console.log("Запускаем определение по IP через DaData (РФ)...");
    const response = await axios.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=",
      {}, // Передаем пустой объект, чтобы DaData сама определила IP клиента
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${import.meta.env.VITE_DADATA_API_KEY}`,
        },
      },
    );
    const locationData = response.data?.location?.data;
    //console.log("locationData = ", locationData);

    if (locationData) {
      const country = locationData.country || "Россия";
      const region = locationData.region_with_type || "";
      const city =
        locationData.city_with_type || locationData.settlement_with_type || "";
      // console.log(
      //   `[DaData IP] Успешно найдено: ${country}, ${region}, ${city}`,
      // );
      return {
        lat: locationData.geo_lat,
        lon: locationData.geo_lon,
        address: `${country}, ${region}, ${city}`,
      };
    } else {
      throw new Error("Локация не найдена в базе данных DaData");
    }
  } catch (ipError) {
    if (ipError instanceof Error) {
      console.error("Ошибка резервного метода (DaData IP):", ipError.message);
    }
    console.error("Не удалось определить местоположение");
  }
}

export interface SuggestedCity {
  title: string;
  value: {
    lat: number;
    lon: number;
  };
}

interface DaDataSuggestionItem {
  value: string;
  data: {
    geo_lat: string;
    geo_lon: string;
  };
}

export async function fetchCitySuggestions(
  query: string,
  signal?: AbortSignal,
): Promise<SuggestedCity[]> {
  if (!query || query.trim().length < 2) return [];

  try {
    const response = await axios.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        query: query,
        from_bound: { value: "city" }, // Только города
        to_bound: { value: "city" },
        count: 5, // Достаточно топ-5 совпадений
      },
      {
        signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${import.meta.env.VITE_DADATA_API_KEY}`,
        },
      },
    );

    const suggestions = response.data?.suggestions || [];

    // Ппонятный для Vuetify формат
    return (suggestions as DaDataSuggestionItem[])
      .filter((item) => item.data?.geo_lat && item.data?.geo_lon)
      .map((item) => ({
        title: item.value,
        value: {
          lat: parseFloat(item.data.geo_lat),
          lon: parseFloat(item.data.geo_lon),
        },
      }));
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
    return [];
  }
}
