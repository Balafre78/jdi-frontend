<template>
  <div class="flex items-center gap-1 h-8">
    <div
      v-for="st in statuses"
      :key="st.key"
      :class="[
        'transition-all duration-200 rounded cursor-pointer',
        st.key === status ? 'w-8 h-8 shadow-lg' : 'w-4 h-8 opacity-40',
        st.color
      ]"
      @click="status = st.key"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { TaskStatus } from '@/types';
import type { ModelRef } from "vue";

const status: ModelRef<TaskStatus> = defineModel('status', {
  type: () => TaskStatus,
  required: true
})
const statuses = [
  { key: TaskStatus.TODO, color: 'bg-red-500' },
  { key: TaskStatus.DOING, color: 'bg-orange-300' },
  { key: TaskStatus.DONE, color: 'bg-green-500' }
]
</script>
