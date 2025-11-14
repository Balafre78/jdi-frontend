<template>
  <aside class="w-1/5 backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg p-4 ">
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-white font-bold">Todolists</h2>
      <button @click="emit('create')" class="text-sm text-blue-400 hover:cursor-pointer hover:underline">New</button>
    </div>

    <ul class="space-y-2 overflow-auto ">
      <li v-for="list in lists" :key="list.id">
        <div
          role="button"
          class="w-full text-left p-3 rounded hover:bg-white/5 hover:cursor-pointer flex justify-between items-start"
          :class="{ 'bg-white/5': selectedId === list.id }"
          @click="emit('select', list.id)">
          <div>
            <div class="text-white font-semibold">{{ list.title }}</div>
            <div class="text-sm text-gray-300">{{ list.description }}</div>
          </div>
          <div class="text-xs text-gray-400">{{ list.archived ? 'archived' : '' }}</div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import type { Todolist } from '@/types'

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'create'): void
}>()

const { lists, selectedId } = defineProps<{
  lists: Todolist[]
  selectedId?: string
}>()
</script>

<style scoped>
aside::-webkit-scrollbar {
  width: 8px;
}
aside::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.08);
  border-radius: 4px;
}
</style>
