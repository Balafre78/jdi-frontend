<template>
  <div class="flex flex-row h-full">
    <aside
      class="lg:w-1/5 md:w-1/4 sm:w-1/3 w-1/2 backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg p-4 h-full max-h-full min-h-0 flex flex-col"
    >
      <div class="flex flex-row justify-between items-center mb-3 flex-none">
        <h2 class="text-white font-bold">Todolists</h2>
        <CreateModal @create="onCreateList">
          <IconButton variant="ghost" :icon="faPlus" :label="t('lists.button.newList')" />
        </CreateModal>
      </div>

      <ul class="space-y-2 overflow-y-auto flex-1 min-h-0 flex flex-col">
        <li v-for="list in listsToShow" :key="list.id">
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
            <div class="text-xs text-gray-400">{{ list.archived ? t('lists.text.archived') : '' }}</div>
          </div>
        </li>
      </ul>

      <div class="flex flex-row justify-between items-center mt-3 flex-none">
        <span class="text-sm text-gray-300">{{ t('lists.text.listCount', listsToShow.length) }}</span>
        <label class="flex items-center text-gray-300 gap-2"
        >{{ t('lists.button.showArchived')
          }}<input type="checkbox" class="mr-2" name="showArchived" v-model="showArchived"
          /></label>
      </div>
    </aside>


    <div
      class="ml-4 flex-1 p-4 min-h-0 overflow-auto backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg"
    >
      <div v-if="selectedListId" class="space-y-4">
        <div class="flex items-center justify-between min-h-16">
          <div>
            <h1 class="text-2xl font-bold text-white">{{ selectedList!.title }}</h1>
            <p class="text-gray-300">{{ selectedList!.description }}</p>
          </div>
          <div>
            <div v-if="selectedList!.archived" class="flex flex-row gap-2">
              <IconButton
                variant="ghost"
                :icon="faRotateLeft"
                :label="t('lists.button.restore')"
                @click="onUnarchiveList"
              />
              <ListDeleteModal @confirm="onDeleteList">
                <IconButton variant="danger" :icon="faTrash" :label="t('lists.button.delete')" />
              </ListDeleteModal>
            </div>
            <div v-else class="flex flex-row gap-2">
              <IconButton
                variant="ghost"
                :icon="tasksSortingAsc ? faArrowUpShortWide : faArrowDownShortWide"
                @click="tasksSortingAsc = !tasksSortingAsc"
              />
              <IconButton
                variant="ghost"
                :icon="faSort"
                :label="tasksSorting == 'name' ? t('lists.button.sortByName') : t('lists.button.sortByStatus')"
                @click="tasksSorting == 'name' ? tasksSorting = 'status' : tasksSorting = 'name'"
              />
              <ListArchiveModal @confirm="onArchiveList">
                <IconButton variant="danger" :icon="faBoxArchive" :label="t('lists.button.archive')" />
              </ListArchiveModal>
              <TaskAddModal @create="onCreateTask">
                <IconButton variant="primary" :icon="faPlus" :label="t('lists.button.addTask')" />
              </TaskAddModal>
            </div>
          </div>
        </div>

        <div>
          <div class="mt-2 space-y-2">
            <TaskItem v-for="task in tasksToShow" :key="task.id" :task="task" @update="onUpdateTask" />
            <div v-if="tasks && tasks.length === 0" class="text-gray-400">{{ t('lists.text.noTask') }}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-400">{{ t('lists.text.selectList') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateModal from "@/components/list/CreateModal.vue";
import ListArchiveModal from "@/components/list/ArchiveModal.vue";
import TaskAddModal from "@/components/list/task/AddModal.vue";
import TaskItem from "@/components/list/task/Item.vue";
import ListDeleteModal from "@/components/list/DeleteModal.vue";
import {
  faPlus,
  faTrash,
  faBoxArchive,
  faRotateLeft,
  faArrowDownShortWide, faArrowUpShortWide, faSort
} from '@fortawesome/free-solid-svg-icons'
import IconButton from '@/components/common/IconButton.vue';

import type {
  CreateTaskRequest,
  CreateTodolistRequest,
  Task,
  Todolist,
  UpdateTaskRequest
} from '@/types';
import { computed, type ComputedRef, onMounted, ref, type Ref } from "vue";
import {
  createTask,
  createTodolist, deleteTodolist,
  getTasks,
  getTodolists, updateTask,
  updateTodolist
} from "@/api/todolist.ts";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Refs
const selectedListId: Ref<string | null> = ref<string | null>(null);
const lists: Ref<Todolist[]> = ref<Todolist[]>([]);
const tasks: Ref<Task[]> = ref<Task[]>([]);

const showArchived: Ref<boolean> = ref<boolean>(false);
const tasksSorting: Ref<'name' | 'status'> = ref<'name' | 'status'>('name');
const tasksSortingAsc: Ref<boolean> = ref<boolean>(true);

const selectedList: ComputedRef<Todolist | null> = computed(() => {
  return lists.value.find(list => list.id === selectedListId.value) || null;
});

const listsToShow: ComputedRef<Todolist[]> = computed(() => {
  if (showArchived.value) {
    return lists.value;
  } else {
    return lists.value.filter(list => !list.archived);
  }
});

const tasksToShow: ComputedRef<Task[]> = computed(() => {
  let filteredTasks = tasks.value;
  if (tasksSorting.value === 'name') {
    filteredTasks = filteredTasks.sort((a, b) => {
      if (tasksSortingAsc.value) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  } else if (tasksSorting.value === 'status') {
    filteredTasks = filteredTasks.sort((a, b) => {
      if (tasksSortingAsc.value) {
        return a.status.localeCompare(b.status);
      } else {
        return b.status.localeCompare(a.status);
      }
    });
  }
  return filteredTasks;
});

async function selectList(listId: string) {
  selectedListId.value = listId;
  tasks.value = await getTasks(listId);
}

async function onCreateList(data: CreateTodolistRequest) {
  await createTodolist(data);
  lists.value = await getTodolists();
}

async function onArchiveList() {
  await updateTodolist(selectedListId.value!, {
    archived: true
  });
  lists.value = await getTodolists();
}

async function onUnarchiveList() {
  await updateTodolist(selectedListId.value!, {
    archived: false
  });
  lists.value = await getTodolists();
}

async function onDeleteList() {
  await deleteTodolist(selectedListId.value!)
  lists.value = await getTodolists();
  selectedListId.value = null;
}

async function onCreateTask(data: CreateTaskRequest) {
  await createTask(selectedListId.value!, data);
  tasks.value = await getTasks(selectedListId.value!);
}

async function onUpdateTask(taskId: string, data: UpdateTaskRequest) {
  await updateTask(selectedListId.value!, taskId, data);
  tasks.value = await getTasks(selectedListId.value!);
}

onMounted(async () => {
  lists.value = await getTodolists();
});
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
