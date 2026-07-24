import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App", () => {
  it("mounts renders properly", () => {
    const wrapper = shallowMount(App, {
      global: {
        // Явно глушим глобальные компоненты роутера и Vuetify
        stubs: {
          RouterView: true,
          VContainer: true,
          VApp: true,
        },
      },
    });

    // Проверяем существование корневого компонента
    expect(wrapper.exists()).toBe(true);
  });
});
