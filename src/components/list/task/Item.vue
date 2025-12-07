<template>
  <div
    class="py-2 px-4 border border-gray-300 rounded-lg shadow-sm transition-shadow flex flex-row justify-between items-center"
  >
    <div class="flex flex-col">
      <h3 class="text-lg text-white font-semibold">{{ task.name }}</h3>
      <p class="text-gray-400">{{ task.description }}</p>
    </div>
    <div class="flex flex-row items-center">
      <EditTaskModal :task="task" @update="onTaskUpdate">
        <button class="text-sm text-blue-400 hover:cursor-pointer hover:underline mr-4">
          Edit
        </button>
      </EditTaskModal>
      <StatusSwitcher :status="status" @update:status="updateStatus" class="min-h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task, TaskStatus, UpdateTaskRequest } from '@/types'
import StatusSwitcher from '@/components/list/task/StatusSwitcher.vue'
import { ref } from 'vue'
import EditTaskModal from '@/components/list/task/EditModal.vue'
import { useTodolistStore } from '@/stores/todolist.ts'

const todolistStore = useTodolistStore()

const { task, selectedListId } = defineProps<{ task: Task; selectedListId: string }>()

const status = ref(task.status)

async function updateStatus(newStatus: TaskStatus) {
  status.value = newStatus
  await todolistStore.editTask(selectedListId, task.id, { status: newStatus })
}

async function onTaskUpdate(newTask: UpdateTaskRequest) {
  await todolistStore.editTask(selectedListId, task.id, newTask)
}
</script>
