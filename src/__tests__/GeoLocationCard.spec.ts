import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import GeoLocationCard from "@/components/GeoLocationCard.vue";

describe("GeoLocationCard.vue", () => {
  // Сценарий, когда координат нет
  it("должен выводить 'Не определена', если latitude и longitude не переданы", () => {
    const wrapper = shallowMount(GeoLocationCard, {
      props: {
        latitude: null,
        longitude: null,
      },
    });

    // Проверяем, что текст "Не определена" появился в шаблоне для обоих полей
    expect(wrapper.text()).toContain("Не определена");

    // Считаем количество вхождений строки, их должно быть ровно 2 (для широты и долготы)
    const occurrences = wrapper.text().match(/Не определена/g);
    expect(occurrences?.length).toBe(2);
  });

  // Сценарий, когда координаты успешно переданы
  it("должен корректно выводить координаты и округлять их до 6 знаков после запятой", () => {
    const wrapper = shallowMount(GeoLocationCard, {
      props: {
        latitude: 55.94692993040663,
        longitude: 36.20446014654784,
      },
    });

    // Проверяем, что длинные числа округлились строго согласно .toFixed(6)
    expect(wrapper.text()).toContain("55.946930");
    expect(wrapper.text()).toContain("36.204460");

    // Гарантируем, что текста "Не определена" на экране больше нет
    expect(wrapper.text()).not.toContain("Не определена");
  });
});
