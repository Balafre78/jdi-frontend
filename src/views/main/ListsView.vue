<template>
  <div class="flex flex-row h-full">
    <ListSidebar
      :lists="lists"
      @select="selectList"
      @update="fetchLists"
    />
    <ListDetails
      :list="selectedList"
      :tasks="selectedTasks"
      @archive="archiveList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref, onMounted } from 'vue';
import ListSidebar from '@/components/lists/Sidebar.vue';
import ListDetails from '@/components/lists/Details.vue';
import type { Todolist, Task } from '@/types';
import { getTasks, getTodolists } from '@/api/todolist.ts';

const lists: Ref<Todolist[]> = ref<Todolist[]>([])
const selectedListId: Ref<string | undefined> = ref<string | undefined>(undefined)
const selectedList = computed(() => lists.value.find((l) => l.id === selectedListId.value) ?? null)
const selectedTasks: Ref<Task[]> = ref<Task[]>([])

async function fetchLists() {
  lists.value = await getTodolists();
}

async function selectList(id: string) {
  selectedListId.value = id;
  selectedTasks.value = await getTasks(id);
}

function archiveList(id: string) {

}

onMounted(() => fetchLists());
</script>
