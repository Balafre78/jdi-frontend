<template>
  <div class="flex items-center gap-1 h-8">
    <div
      v-for="st in statuses"
      :key="st.key"
      :class="[
        'transition-all duration-200 rounded cursor-pointer',
        st.key === props.status ? 'w-8 h-8 shadow-lg' : 'w-4 h-8 opacity-40',
        st.color
      ]"
      @click="click(st.key)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { TaskStatus } from '@/types';

const props = defineProps<{ status: TaskStatus }>();
const emit = defineEmits<{
  (e: 'update:status', status: TaskStatus): void
}>()
const statuses = [
  { key: TaskStatus.TODO, color: 'bg-red-500' },
  { key: TaskStatus.DOING, color: 'bg-orange-300' },
  { key: TaskStatus.DONE, color: 'bg-green-500' }
]
function click(st: TaskStatus) {
  emit('update:status', st)
}
</script>
