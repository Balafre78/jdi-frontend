<template>
  <div class="flex flex-row h-full">
    <ListSidebar
      :selectedListId="selectedListId"
      @update:selectedListId="(newSelectedListId) => selectedListId = newSelectedListId"
    />
    <ListDetails
      v-if="selectedListId"
      :selectedListId="selectedListId"
    />
    <div v-else class="flex flex-col items-center h-full justify-center text-white flex-1">
      <h1 class="text-5xl font-bold text-shadow-lg">Click on a list to show tasks</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListSidebar from '@/components/list/Sidebar.vue'
import ListDetails from '@/components/list/Details.vue'
import { useTodolistStore } from '@/stores/todolist.ts'
import { onMounted, ref } from 'vue'
const todolistStore = useTodolistStore()

const selectedListId = ref<string | null>(null)
onMounted(async () => {
  await todolistStore.fetchLists()
})
</script>
