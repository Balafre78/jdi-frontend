<template>
  <Modal ref="modal" :title="t('lists.form.create.text.title')">
    <template #trigger>
      <slot/>
    </template>
    <template #content>
      <div class="space-y-4 flex flex-col">
        <div>
          <label for="title" class="text-white">{{ t('lists.form.create.input.title.label') }}</label>
          <input
            id="title"
            name="title"
            v-model="title"
            type="text"
            :placeholder="t('lists.form.create.input.title.placeholder')"
            autofocus
            class="w-full rounded-full px-4 py-3 mt-2 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white"
          />
        </div>
        <div>
          <label for="description" class="text-white">{{ t('lists.form.create.input.description.label') }}</label>
          <textarea
            id="description"
            name="description"
            v-model="description"
            :placeholder="t('lists.form.create.input.description.placeholder')"
            class="w-full rounded-3xl px-4 py-3 mt-2 min-h-20 h-20 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white"
          />
        </div>
        <button @click="submit" class="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-4 py-2">
          {{ t('lists.form.create.button.create') }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/common/Modal.vue';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import type { CreateTodolistRequest } from '@/types'
import { createTodolist } from '@/api/todolist.ts'

const { t } = useI18n();

const modal = ref(Modal);
const title = ref('');
const description = ref('');

const emit = defineEmits<{
  (e: 'created'): void
}>()

async function submit() {
  if (!title.value.trim()) {
    return;
  }
  const body: CreateTodolistRequest = {
    title: title.value.trim(),
    description: description.value.trim()
  };
  try {
    await createTodolist(body);
    title.value = '';
    description.value = '';
    modal.value.close();
    emit('created');
  } catch {
  }
}
</script>
