<template>
  <div
    class="py-2 px-4 border border-gray-300 rounded-lg shadow-sm transition-shadow flex flex-row justify-between items-center"
  >
    <div class="flex flex-col">
      <h3 class="text-lg text-white font-semibold">{{ task.name }}</h3>
      <p class="text-gray-400">{{ task.description }}</p>
    </div>
    <div>
      <EditModal :task="task" @update="emit('update')" />
      <StatusSwitcher
        :status="status"
        @update:status="(newStatus) => (status = newStatus)"
        class="min-h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Task, type UpdateTaskRequest } from '@/types'
import StatusSwitcher from '@/components/list/task/StatusSwitcher.vue'
import { ref } from 'vue'
import EditModal from '@/components/list/task/EditModal.vue'
import { updateTask } from '@/api/todolist.ts'

const { task } = defineProps<{ task: Task }>()
const status = ref(task.status)
const emit = defineEmits<{
  (e: 'update'): void
}>()

</script>
