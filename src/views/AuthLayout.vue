<script setup lang="ts">
</script>

<template>
  <main class="h-screen w-full background flex items-center justify-center">
    <RouterView/>
  </main>
</template>

<style scoped>
.background {
  background-image: url('/src/assets/img/background.jpg');
  background-size: cover;
  background-position: center;
}
</style>
