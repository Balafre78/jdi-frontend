<template>
  <div class="flex items-start gap-3 p-2 hover:bg-white/5 rounded cursor-pointer" @click="$emit('toggle')">
    <input type="checkbox" :checked="task.status === 'done'" @change="$emit('toggle')" class="mt-1" />
    <div class="flex-1">
      <div class="font-semibold text-white">{{ task.name }}</div>
      <div class="text-sm text-gray-300">{{ task.description }}</div>
    </div>
    <div class="text-xs text-gray-400">{{ task.status }}</div>
  </div>
</template>

<script setup lang="ts">
import { type Task } from '@/types/api'

const { task } = defineProps<{ task: Task }>()
</script>

<style scoped>
/* small styles to keep look consistent */
</style>
