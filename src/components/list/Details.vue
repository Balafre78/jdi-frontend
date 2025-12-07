<template>
  <div
    class="ml-4 flex-1 p-4 min-h-0 overflow-auto backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg"
  >
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white">{{ selectedList.title }}</h1>
          <p class="text-gray-300">{{ selectedList.description }}</p>
        </div>
        <div>
          <button class="px-3 py-1 bg-red-600 text-white rounded">Archive</button>
          <TaskAddModal @create="onCreateTask">
            <button class="ml-2 px-3 py-1 bg-green-600 text-white rounded">Add Task</button>
          </TaskAddModal>
        </div>
      </div>

      <div>
        <div class="mt-2 space-y-2">
          <TaskItem v-for="task in tasks" :key="task.id" :task="task" :selectedListId="selectedListId" />
          <div v-if="tasks && tasks.length === 0" class="text-gray-400">No tasks yet</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskItem from '@/components/list/task/Item.vue'
import TaskAddModal from '@/components/list/task/AddModal.vue'
import type { CreateTaskRequest } from '@/types'
import { useTodolistStore } from '@/stores/todolist.ts'
import { computed, onMounted, watch } from 'vue'

const todolistStore = useTodolistStore()

const { selectedListId } = defineProps<{
  selectedListId: string
}>()

const selectedList = computed(() => {
  return todolistStore.lists.find((list) => list.id === selectedListId)!
})

const tasks = computed(() => {
  return todolistStore.tasksByList[selectedListId]
})

async function onCreateTask(data: CreateTaskRequest) {
  try {
    await todolistStore.addTask(selectedListId, data)
  } catch (e) {
    console.error('Error creating task:', e)
  }
}

onMounted(async () => {
  await todolistStore.fetchTasks(selectedListId)
})

watch(() => selectedListId, async (newListId: string) => {
  await todolistStore.fetchTasks(newListId)
})
</script>

<style scoped>
/* scrollbar for details pane */
div::-webkit-scrollbar {
  width: 8px;
}
div::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
}
</style>
