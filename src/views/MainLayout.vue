<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="h-screen w-full max-w-screen background">
    <Navbar class="fixed"/>
    <main class="h-full pt-17">
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
