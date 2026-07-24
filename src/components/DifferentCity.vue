<template>
  <v-alert
    v-if="searchErrorText"
    type="warning"
    variant="tonal"
    density="compact"
    class="alertWeather"
  >
    {{ searchErrorText }}
  </v-alert>

  <v-autocomplete
    v-model="selectedCityCoords"
    v-model:search="searchInput"
    item-title="title"
    item-value="value"
    return-object
    label="Динамический поиск погоды в любом городе"
    placeholder="Начните вводить название города..."
    variant="outlined"
    density="comfortable"
    theme="dark"
    color="indigo-lighten-2"
    hide-details
    no-data-text="Города с таким названием не найдены"
    clearable
    persistent-placeholder
    :items="citiesItems"
    :loading="isSearchLoading || isSelectedWeatherLoading"
  ></v-autocomplete>

  <div class="selectedWeather">
    <WeatherCard
      v-if="selectedCityCoords"
      caption="Погода в выбранном населённом пункте"
      :weatherData="selectedWeather"
      :weatherError="selectedWeatherError"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { fetchCitySuggestions, type SuggestedCity } from "@/api/dadata.service";
import { useWeather } from "@/composables/useWeather";

import WeatherCard from "@/components/WeatherCard.vue";

defineOptions({
  name: "DifferentCity",
});

const {
  weatherData: selectedWeather,
  isWeatherLoading: isSelectedWeatherLoading,
  loadWeather: loadSelectedWeather,
  weatherError: selectedWeatherError,
} = useWeather();

const searchInput = ref("");
const citiesItems = ref<SuggestedCity[]>([]);
const selectedCityCoords = ref<SuggestedCity | null>(null);
const isSearchLoading = ref(false);
const searchErrorText = ref<string | null>(null);

watch(searchInput, async (newQuery) => {
  if (!newQuery || newQuery.length < 2) {
    citiesItems.value = [];
    searchErrorText.value = null;
    return;
  }
  try {
    isSearchLoading.value = true;
    searchErrorText.value = null;
    citiesItems.value = await fetchCitySuggestions(newQuery);
  } catch (searchError: unknown) {
    citiesItems.value = [];
    if (searchError instanceof Error) {
      searchErrorText.value = searchError.message;
    } else {
      searchErrorText.value = "Произошла ошибка при поиске городов";
    }
    console.error(searchError);
  } finally {
    isSearchLoading.value = false;
  }
});

watch(selectedCityCoords, (newCity: SuggestedCity | null) => {
  if (newCity && newCity.value) {
    const { lat, lon } = newCity.value;
    loadSelectedWeather(lat, lon);
  }
});
</script>

<style scoped>
.selectedWeather {
  margin-top: 16px;
}
</style>
