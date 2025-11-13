<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="h-screen w-full background flex flex-col p-4">
    <Navbar class="h-fit"/>
    <main class="mt-4 h-full">
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
