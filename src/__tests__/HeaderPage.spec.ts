import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import HeaderPage from "@/components/HeaderPage.vue";

describe("HeaderPage.vue", () => {
  it("должен корректно отображать заголовок тестового задания", () => {
    const wrapper = shallowMount(HeaderPage, {
      global: {
        stubs: {
          // Вместо урезания (true) мы просим отрендерить кастомный шаблон,
          // который просто прокидывает внутренний контент наружу через слот
          VContainer: {
            template: "<div><slot /></div>",
          },
        },
      },
    });

    // Теперь текст внутри v-container успешно попадет в HTML-дерево
    expect(wrapper.text()).toContain(
      'Тестовое задание для "Программы и технологии"',
    );
    expect(wrapper.text()).toContain("🌤️");
  });
});
