<template>
  <div class="flex flex-row h-full">
    <ListSidebar
      :lists="lists"
      @select="onSelectList"
      @update="fetchLists"
    />
    <ListDetails
      v-if="selectedList"
      :list="selectedList"
      :tasks="selectedListTasks"
      @update="fetchTasks"
    />
    <div v-else class="flex flex-col items-center h-full justify-center text-white flex-1">
      <h1 class="text-5xl font-bold text-shadow-lg">Click on a list to show tasks</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref, onMounted } from 'vue';
import ListSidebar from '@/components/list/Sidebar.vue';
import ListDetails from '@/components/list/Details.vue';
import type { Todolist, Task } from '@/types';
import { getTasks, getTodolists } from '@/api/todolist.ts';

const lists: Ref<Todolist[]> = ref<Todolist[]>([])
const selectedListId: Ref<string | undefined> = ref<string | undefined>(undefined)
const selectedList = computed(() => lists.value.find((l) => l.id === selectedListId.value) ?? null)
const selectedListTasks: Ref<Task[]> = ref<Task[]>([])

async function fetchLists() {
  lists.value = await getTodolists();
}

async function fetchTasks() {
  selectedListTasks.value = await getTasks(selectedListId.value!);
}

async function onSelectList(id: string) {
  selectedListId.value = id;
  await fetchTasks();
}

onMounted(() => fetchLists());
</script>
