<template>
  <div class="flex-1 p-6 min-h-0 overflow-auto">
    <div v-if="!list" class="text-gray-300">Select a list to see details</div>
    <div v-else class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white">{{ list.title }}</h1>
          <p class="text-gray-300">{{ list.description }}</p>
        </div>
        <div>
          <button class="px-3 py-1 bg-red-600 text-white rounded" @click="$emit('archive', list.id)">Archive</button>
        </div>
      </div>

      <div>
        <h2 class="text-white font-semibold">Tasks</h2>
        <div class="mt-2 space-y-2">
          <TaskItem v-for="task in tasks" :key="task.id" :task="task" @toggle="toggleTask(task.id)" />
          <div v-if="tasks.length === 0" class="text-gray-400">No tasks yet</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TaskItem from './TaskItem.vue'
import { type Todolist, type Task } from '@/types'

const props = defineProps<{
  list?: Todolist | null
  tasks?: Task[]
}>()

const emit = defineEmits<{
  (e: 'toggleTask', id: string): void
  (e: 'archive', id: string): void
}>()

const tasks = ref(props.tasks ?? [])

function toggleTask(id: string) {
  emit('toggleTask', id)
}
</script>

<style scoped>
/* scrollbar for details pane */
div::-webkit-scrollbar {
  width: 8px;
}
div::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.04);
  border-radius: 4px;
}
</style>
