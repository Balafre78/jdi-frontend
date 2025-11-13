<template>
  <div class="flex">
    <TodoListSidebar
      :lists="lists"
      :selectedId="selectedListId"
      @select="selectList"
      @create="createList"
    />

    <TodoListDetails
      :list="selectedList"
      :tasks="selectedTasks"
      @toggleTask="toggleTaskStatus"
      @archive="archiveList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TodoListSidebar from '@/components/lists/TodoListSidebar.vue'
import TodoListDetails from '@/components/lists/TodoListDetails.vue'
import type { Todolist, Task } from '@/types/api'

// mock data
const lists = ref<Todolist[]>([
  { id: '1', title: 'Shopping', description: 'Groceries and more', archived: false },
  { id: '2', title: 'Work', description: 'Work related tasks', archived: false },
  { id: '3', title: 'Home', description: 'House chores', archived: false },
])

const tasksByList = ref<Record<string, Task[]>>({
  '1': [
    { id: 't1', name: 'Buy milk', description: '2 liters', status: 'todo' },
    { id: 't2', name: 'Buy eggs', description: 'A dozen', status: 'doing' },
  ],
  '2': [
    { id: 't3', name: 'Email client', description: 'Send proposal', status: 'todo' },
    { id: 't4', name: 'Prepare slides', description: 'Meeting on Friday', status: 'doing' },
  ],
  '3': [
    { id: 't5', name: 'Clean kitchen', description: '', status: 'done' },
  ],
})

const selectedListId = ref<string | undefined>(lists.value[0]?.id ?? undefined)

const selectedList = computed(() => lists.value.find(l => l.id === selectedListId.value) ?? null)
const selectedTasks = computed(() => (selectedListId.value ? tasksByList.value[selectedListId.value] ?? [] : []))

function selectList(id: string) {
  selectedListId.value = id
}

function createList() {
  const id = String(Date.now())
  const newList: Todolist = { id, title: 'New list', description: '', archived: false }
  lists.value.unshift(newList)
  tasksByList.value[id] = []
  selectedListId.value = id
}

function toggleTaskStatus(taskId: string) {
  const tasks = selectedTasks.value
  const t = tasks.find(x => x.id === taskId)
  if (!t) return
  if (t.status === 'todo') t.status = 'doing'
  else if (t.status === 'doing') t.status = 'done'
  else t.status = 'todo'
}

function archiveList(id: string) {
  const l = lists.value.find(x => x.id === id)
  if (l) l.archived = true
  // if archived is selected, deselect
  if (selectedListId.value === id) selectedListId.value = null
}
</script>

<style scoped>
.h-full { height: 100vh; }
</style>
