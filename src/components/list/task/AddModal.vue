<template>
  <Modal ref="modal" :title="t('lists.form.addTask.text.title')">
    <template #trigger>
      <slot />
    </template>
    <template #content>
      <div class="space-y-4 flex flex-col">
        <InputField
          id="name"
          :label="t('lists.form.addTask.input.name.label')"
          :placeholder="t('lists.form.addTask.input.name.placeholder')"
          v-model="name"
        />
        <TextField
          id="description"
          :label="t('lists.form.addTask.input.description.label')"
          :placeholder="t('lists.form.addTask.input.description.placeholder')"
          v-model="description"
        />
        <button
          @click="submit"
          class="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-4 py-2"
        >
          {{ t('lists.form.addTask.button.add') }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/common/Modal.vue';
import InputField from '@/components/common/InputField.vue';
import TextField from '@/components/common/TextField.vue';
import type { CreateTaskRequest } from '@/types';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { t } = useI18n();

const modal = ref(Modal);
const name = ref('');
const description = ref('');

const emit = defineEmits<{
  (e: 'create', body: CreateTaskRequest): void
}>()

async function submit() {
  if (!name.value.trim()) {
    return;
  }
  const body: CreateTaskRequest = {
    name: name.value.trim(),
    description: description.value.trim(),
  };
  name.value = '';
  description.value = '';
  modal.value.close();
  emit('create', body);
}
</script>
