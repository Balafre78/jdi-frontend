<template>
  <div class="flex flex-col items-center justify-center text-white h-full">
    <div class="p-4 backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg">
      <h2 class="text-5xl font-extrabold tracking-tight drop-shadow-lg mb-4 text-indigo-400">{{ t('user.text.profile') }}</h2>
      <p><span class="font-bold">{{t('user.text.username')}} :</span> {{ authStore.user?.username }}</p>
      <p><span class="font-bold">{{t('user.text.email')}} :</span> {{ authStore.user?.email }}</p>
      <p><span class="font-bold">{{t('user.text.firstName')}} :</span> {{ authStore.user?.firstName }}</p>
      <p><span class="font-bold">{{t('user.text.lastName')}} :</span> {{ authStore.user?.lastName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.ts";
import { useI18n } from "vue-i18n";

const authStore = useAuthStore()
const { t } = useI18n();
</script>

<style scoped></style>
