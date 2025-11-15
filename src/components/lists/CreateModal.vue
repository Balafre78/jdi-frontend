<template>
  <Modal ref="modal" :title="t('lists.form.create.text.title')">
    <template #trigger>
      <slot/>
    </template>
    <template #content>
      <div class="space-y-4 flex flex-col">
        <InputField
          id="title"
          :label="t('lists.form.create.input.title.label')"
          :placeholder="t('lists.form.create.input.title.placeholder')"
          v-model="title"
        />
        <TextField
          id="description"
          :label="t('lists.form.create.input.description.label')"
          :placeholder="t('lists.form.create.input.description.placeholder')"
          v-model="description"
        />
        <button @click="submit" class="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-4 py-2">
          {{ t('lists.form.create.button.create') }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/common/Modal.vue';
import InputField from '@/components/common/InputField.vue'
import TextField from '@/components/common/TextField.vue'
import type { CreateTodolistRequest } from '@/types'
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { createTodolist } from '@/api/todolist.ts';

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
