import { describe, it, expect } from "vitest";
import { getWindDirection } from "@/utils/weather";

describe("getWindDirection", () => {
  it("должен правильно определять северный ветер при 0 градусов", () => {
    expect(getWindDirection(0)).toBe("⬇️ С");
  });

  it("должен правильно определять северо-восточный ветер при 50 градусах", () => {
    // Как раз ваш случай из JSON: deg: 50
    expect(getWindDirection(50)).toBe("↙️ СВ");
  });

  it("должен корректно обрабатывать значения больше 360 градусов", () => {
    expect(getWindDirection(410)).toBe("↙️ СВ"); // 410 % 360 = 50 градусов
  });
});
