<template>
  <aside
    class="lg:w-1/5 md:w-1/4 sm:w-1/3 w-1/2 backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg p-4 h-full max-h-full min-h-0 flex flex-col"
  >
    <div class="flex flex-row justify-between items-center mb-3 flex-none">
      <h2 class="text-white font-bold">Todolists</h2>
      <CreateModal @create="onCreateList">
        <button class="text-sm text-blue-400 hover:cursor-pointer hover:underline">New</button>
      </CreateModal>
    </div>

    <ul class="space-y-2 overflow-y-auto flex-1 min-h-0 flex flex-col">
      <li v-for="list in todolistStore.lists" :key="list.id">
        <div
          role="button"
          class="w-full text-left p-3 rounded hover:bg-white/5 hover:cursor-pointer flex justify-between items-start"
          :class="{ 'bg-white/5': selectedListId === list.id }"
          @click="selectList(list.id)"
        >
          <div>
            <div class="text-white font-semibold">{{ list.title }}</div>
            <div class="text-sm text-gray-300">{{ list.description }}</div>
          </div>
          <div class="text-xs text-gray-400">{{ list.archived ? 'archived' : '' }}</div>
        </div>
      </li>
    </ul>

    <div class="flex flex-row justify-between items-center mt-3 flex-none">
      <span class="text-sm text-gray-300">{{ todolistStore.lists.length }} lists</span>
      <label class="flex items-center text-gray-300 gap-2"
      >{{ t('lists.sidebar.showArchived')
        }}<input type="checkbox" class="mr-2" name="showArchived" v-model="showArchived"
        /></label>
    </div>
  </aside>
</template>

<script setup lang="ts">
import CreateModal from '@/components/list/CreateModal.vue'
import type { CreateTodolistRequest } from '@/types'
import { useI18n } from 'vue-i18n'
import { type Ref, ref } from 'vue'
import { useTodolistStore } from '@/stores/todolist.ts'

const { selectedListId } = defineProps<{
  selectedListId: string | null
}>()

const emit = defineEmits<{
  (e: 'update:selectedListId', value: string): void
}>()

const { t } = useI18n()
const todolistStore = useTodolistStore()

const showArchived: Ref<boolean> = ref(false)

async function selectList(id: string) {
  emit('update:selectedListId', id)
}

async function onCreateList(body: CreateTodolistRequest) {
  try {
    await todolistStore.createList(body)
  } catch (e) {
    console.error('Error creating todolist:', e)
    return
  }
}
</script>

<style scoped>
aside::-webkit-scrollbar {
  width: 8px;
}
aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
}
</style>
