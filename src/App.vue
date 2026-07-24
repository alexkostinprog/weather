<template>
  <div class="appWrapper">
    <HeaderPage />
    <v-container class="mainContent">
      <router-view />
    </v-container>
    <FooterPage />
  </div>
</template>

<script lang="ts" setup>
import HeaderPage from "./components/HeaderPage.vue";
import FooterPage from "./components/FooterPage.vue";
</script>

<style scoped>
.appWrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 300px;
  background-color: #0f172a;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.mainContent {
  flex-grow: 1;
}
</style>

<style>
/* Перехватываем стандартный контейнер списка Vuetify во всем приложении */
.v-overlay-container .v-autocomplete__content .v-list,
.v-overlay-container .v-menu .v-list {
  background-color: #0f172a !important; /* Глубокий темный фон под цвет карточек */
  border: 1px solid rgba(71, 85, 105, 0.4) !important; /* Аккуратная рамка */
  border-radius: 12px !important; /* Скругление */
  box-shadow: none !important;
}

/* Перекрашиваем текст и элементы списка */
.v-overlay-container .v-autocomplete__content .v-list-item-title {
  color: #cbd5e1 !important; /* Светло-серый текст */
}

/* Цвет при наведении мыши на город */
.v-overlay-container .v-autocomplete__content .v-list-item:hover {
  background-color: rgba(99, 102, 241, 0.15) !important; /* Индиго подсветка */
}

/* Цвет уже выбранного города */
.v-overlay-container .v-autocomplete__content .v-list-item--active {
  background-color: rgba(99, 102, 241, 0.3) !important;
}

/* Полностью очищаем внешний контейнер, который создает Vuetify */
.v-overlay-container .v-autocomplete__content,
.v-overlay-container .v-overlay__content {
  box-shadow: none !important;
  background: transparent !important;
  background-color: transparent !important;
  border-radius: 12px !important;
}

/* Делаем сам список плотным, без полупрозрачности и без размытия */
.v-overlay-container .v-autocomplete__content .v-list {
  background-color: #0f172a !important;
  backdrop-filter: none !important;
  border: 1px solid rgba(71, 85, 105, 0.5) !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important; /* Мягкая аккуратная тень */
  overflow: hidden !important;
}
</style>
