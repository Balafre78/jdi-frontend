<template>
  <div class="flex flex-col items-center h-full justify-center text-white">
    <h1 class="text-5xl font-extrabold tracking-tight drop-shadow-lg">{{ t('home.text.welcome')}} <span class="text-indigo-400">JustDoIt</span></h1>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
