<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="h-screen w-full background flex flex-col p-4">
    <Navbar/>
    <main class="mt-4 grow flex-1 min-h-0 overflow-auto border-1 border-white border-dashed">
      <RouterView/>
    </main>
  </div>
</template>

<style scoped>
.background {
  background-image: url('/src/assets/img/background.jpg');
  background-size: cover;
  background-position: center;
}
</style>
