<template>
  <div class="flex flex-col items-center justify-center text-white h-full">
    <div class="p-4 backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg">
      <h2 class="text-3xl font-bold mb-4">User Profile</h2>
      <p><span class="font-bold">Username:</span> {{ authStore.user?.username }}</p>
      <p><span class="font-bold">Email:</span> {{ authStore.user?.email }}</p>
      <p><span class="font-bold">First Name:</span> {{ authStore.user?.firstName }}</p>
      <p><span class="font-bold">Last Name:</span> {{ authStore.user?.lastName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.ts";

const authStore = useAuthStore()
</script>

<style scoped></style>
