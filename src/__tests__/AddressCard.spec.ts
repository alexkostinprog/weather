import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import AddressCard from "@/components/AddressCard.vue";

describe("AddressCard.vue", () => {
  it("должен корректно рендерить переданный адрес", () => {
    const testAddress = "Россия, Московская область, СНТ Ротор";

    const wrapper = shallowMount(AddressCard, {
      props: {
        address: testAddress,
      },
    });

    // Проверяем, что текст адреса успешно появился в HTML-дереве компонента
    expect(wrapper.text()).toContain("🏠 Ваш адрес");
    expect(wrapper.text()).toContain(testAddress);
  });
});
