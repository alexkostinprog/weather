<template>
  <section class="info-block">
    <div class="block-title">📍 Ваше местоположение</div>
    <table class="coords-table">
      <tbody>
        <tr>
          <td>
            <strong>Широта:</strong>
          </td>
          <td class="mono">
            {{ latitude ? latitude.toFixed(6) : "Не определена" }}
          </td>
        </tr>
        <tr>
          <td>
            <strong>Долгота:</strong>
          </td>
          <td class="mono">
            {{ longitude ? longitude.toFixed(6) : "Не определена" }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts" setup>
defineOptions({
  name: "GeoLocationCard",
});

defineProps<{
  latitude: number | null;
  longitude: number | null;
}>();
</script>

<style scoped>
.info-block {
  background: rgba(15, 23, 42, 0.4);
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

.coords-table {
  width: 100%;
  border-collapse: collapse;
}

.coords-table td {
  padding: 3px 0;
  color: #e2e8f0;
  font-size: 14px;
}

.mono {
  font-family: monospace;
  color: #a5b4fc;
  text-align: right;
}
</style>
