<template>
  <section class="info-block">
    <div class="block-title">🏠 Ваш адрес</div>
    <div class="address-text">
      {{ address }}
    </div>
  </section>
</template>

<script lang="ts" setup>
defineOptions({
  name: "AddressCard",
});

defineProps<{
  address: string;
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

.address-text {
  color: #f1f5f9;
  font-size: 14px;
  line-height: 1.5;
}
</style>
