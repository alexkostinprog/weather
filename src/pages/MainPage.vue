<template>
  <main class="main-content">
    <div v-if="isLoading" class="loader-container">
      <v-progress-circular
        v-if="isLocalWeatherLoading"
        indeterminate
        size="64"
        width="6"
      ></v-progress-circular>
      <span class="loader-text">Определяем местоположение...</span>
    </div>
    <div v-if="!isLoading" class="content-fade-in">
      <!-- Координаты -->
      <GeoLocationCard :longitude="longitude" :latitude="latitude" />
      <!-- Адрес -->
      <AddressCard :address="address" />
      <!-- Погода -->
      <WeatherCard
        caption="Погода в вашем населённом пункте"
        :weatherData="localWeather"
        :weatherError="localWeatherError"
      />
    </div>

    <hr class="double-line" />

    <DifferentCity />
  </main>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useLocation } from "@/composables/useLocation";
import { useWeather } from "@/composables/useWeather";

import GeoLocationCard from "@/components/GeoLocationCard.vue";
import AddressCard from "@/components/AddressCard.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import DifferentCity from "@/components/DifferentCity.vue";

defineOptions({
  name: "MainPage",
});

const { latitude, longitude, address, isLoading, initGeolocation } =
  useLocation();

const {
  weatherData: localWeather,
  isWeatherLoading: isLocalWeatherLoading,
  loadWeather: loadLocalWeather,
  weatherError: localWeatherError,
} = useWeather();

onMounted(() => {
  initGeolocation();
});

watch([latitude, longitude], () => {
  if (latitude.value && longitude.value) {
    loadLocalWeather(latitude.value, longitude.value);
  } else {
    loadLocalWeather(null, null);
  }
});
</script>

<style lang="css" scoped>
.main-content {
  min-width: 320px;
}

.title {
  color: #fff;
  font-size: 20px;
  margin-top: 4px;
  margin-bottom: 24px;
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
}

.loader-text {
  margin-top: 16px;
  color: #94a3b8;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.content-fade-in {
  animation: fadeIn 0.4s ease-out-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.double-line {
  border: none;
  border-top: 4px double rgba(71, 85, 105, 0.5);
  margin: 16px 0;
  width: 100%;
}
</style>
