import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import WeatherCard from "@/components/WeatherCard.vue";

describe("WeatherCard.vue", () => {
  const globalConfig = {
    stubs: {
      VAlert: { template: "<div><slot /></div>" },
    },
  };
  // Проверка отображения ошибки сети
  it("должен отображать ошибку v-alert и скрывать погоду, если передан weatherError", () => {
    const wrapper = shallowMount(WeatherCard, {
      global: globalConfig,
      props: {
        caption: "Тестовая погода",
        weatherError: "Проблемы с интернет-соединением.",
        weatherData: undefined,
      },
    });

    // Ошибка должна быть на экране
    expect(wrapper.text()).toContain("Проблемы с интернет-соединением.");
    // Названия карточки и температуры быть не должно
    expect(wrapper.text()).not.toContain("Тестовая погода");
    expect(wrapper.text()).not.toContain("°C");
  });

  // Проверка знака "+" для теплой температуры
  it("должен добавлять знак '+' перед температурой, если она выше 0", () => {
    const fakeWeather = {
      temp: 22.4,
      description: "Ясно",
      icon: "01d",
      wind: {
        speed: 1,
      },
      humidity: 88,
    };

    const wrapper = shallowMount(WeatherCard, {
      props: {
        caption: "Погода дома",
        weatherError: "",
        weatherData: fakeWeather,
      },
      global: globalConfig,
    });

    // Проверяем округление до целого и наличие плюса
    expect(wrapper.text()).toContain("+22°C");
    expect(wrapper.text()).toContain("Ясно");
  });

  // Проверка условий вывода порывов ветра
  it("должен выводить порывы только если они превышают среднюю скорость ветра", () => {
    const fakeWeather = {
      temp: 15,
      description: "Облачно",
      icon: "03d",
      wind: {
        speed: 3.5,
        deg: 90,
        gust: 5.2, // Порывы (5.2) больше скорости (3.5) -> должны показаться
      },
      humidity: 88,
    };

    const wrapper = shallowMount(WeatherCard, {
      props: {
        caption: "Погода дома",
        weatherError: "",
        weatherData: fakeWeather,
      },
      global: globalConfig,
    });

    expect(wrapper.text()).toContain("Ветер: 3.5 м/с");
    expect(wrapper.text()).toContain("Порывы до: 5.2 м/с");
  });

  // Проверка fallback-состояния (когда данных нет)
  it("должен выводить прочерк и дефолтный эмодзи, если данные о погоде отсутствуют", () => {
    const wrapper = shallowMount(WeatherCard, {
      props: {
        caption: "Определяем погоду",
        weatherError: "",
        weatherData: undefined,
      },
      global: globalConfig,
    });

    expect(wrapper.text()).toContain("—°C");
    expect(wrapper.text()).toContain("🌤️");
  });
});
