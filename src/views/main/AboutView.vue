<template>
  <div class="text-white py-16 px-8 max-w-6xl mx-auto space-y-16">

    <section class="backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg p-8">
      <div class="relative z-10 space-y-4 text-center">
        <h1 class="text-5xl font-extrabold tracking-tight drop-shadow-lg">
          {{ t('about.text.title') }}<span class="text-indigo-400"> JustDoIt</span>
        </h1>
        <p class="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          {{ t('about.text.description') }}
        </p>
      </div>
    </section>

    <section class="backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg p-8">
      <div class="relative z-10 space-y-4 text-center">
        <h1 class="text-5xl font-extrabold tracking-tight drop-shadow-lg">
          {{ t('about.text.team') }}
        </h1>
        <div class="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          <p>Raphaël GUIGNOLLE</p>
          <p>Lucas MONNAIS</p>
          <p>Victor LI YIM</p>
          <p>Titouan LENAIN</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
