<template>
  <section class="weather-block">
    <v-alert
      v-if="weatherError"
      type="error"
      variant="tonal"
      theme="dark"
      density="compact"
      icon="mdi-wifi-off"
    >
      {{ weatherError }}
    </v-alert>

    <div v-if="!weatherError">
      <div class="block-title">
        <span class="weatherEmoji">
          {{ weatherData?.icon ? getWeatherEmoji(weatherData.icon) : "🌤️" }}
        </span>
        {{ caption }}
      </div>
      <div class="weather-data">
        <span class="temp">
          {{
            weatherData?.temp !== undefined
              ? (weatherData.temp > 0 ? "+" : "") + weatherData.temp.toFixed(0)
              : "—"
          }}°C
        </span>
        <span class="desc"> {{ weatherData?.description }}</span>
      </div>
      <div v-if="weatherData?.wind">
        <span>💨 Ветер: {{ weatherData.wind.speed }} м/с</span>
        <span v-if="weatherData.wind.deg !== undefined">
          ({{ getWindDirection(weatherData.wind.deg) }})
        </span>
        <span
          v-if="
            weatherData.wind.gust &&
            weatherData.wind.gust > weatherData.wind.speed
          "
        >
          Порывы до:
          <span> {{ weatherData.wind.gust.toFixed(1) }} м/с</span>
        </span>
      </div>
      <div v-if="weatherData?.humidity !== undefined">
        💧 Влажность воздуха:
        <strong> {{ weatherData.humidity }}% </strong>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { fetchWeatherType } from "@/api/weather.service";
import { getWeatherEmoji, getWindDirection } from "@/utils/weather";

defineOptions({
  name: "WeatherCard",
});

defineProps<{
  caption: string;
  weatherData: fetchWeatherType | undefined;
  weatherError: string;
}>();
</script>

<style scoped>
.weather-block {
  background: rgba(49, 46, 129, 0.2);
  border: 1px solid rgba(71, 85, 105, 0.2);
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.block-title {
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 3px;
  font-weight: 500;
}

.weatherEmoji {
  font-size: 16px;
}

.weather-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.temp {
  font-size: 24px;
  font-weight: bold;
}

.desc {
  font-size: 13px;
  color: #cbd5e1;
}
</style>
