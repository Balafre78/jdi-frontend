<template>
  <Modal ref="modal" :title="t('lists.form.update.text.title')">
    <template #trigger>
      <slot/>
    </template>
    <template #content>
      <div class="space-y-4 flex flex-col">
        <InputField
          id="title"
          :label="t('lists.form.update.input.title.label')"
          :placeholder="t('lists.form.update.input.title.placeholder')"
          v-model="title"
        />
        <TextField
          id="description"
          :label="t('lists.form.update.input.description.label')"
          :placeholder="t('lists.form.update.input.description.placeholder')"
          v-model="description"
        />
        <button @click="submit" class="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-4 py-2">
          {{ t('lists.form.update.button.update') }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/common/Modal.vue';
import InputField from '@/components/common/InputField.vue'
import TextField from '@/components/common/TextField.vue'
import type { UpdateTodolistRequest, Todolist } from '@/types'
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { t } = useI18n();

const modal = ref(Modal);
const { list } = defineProps<{
  list: Todolist
}>()
const title = ref(list.title);
const description = ref(list.description);

const emit = defineEmits<{
  (e: 'update', body: UpdateTodolistRequest): void
}>()

async function submit() {
  if (!title.value.trim()) {
    return;
  }
  const body: UpdateTodolistRequest = {
    title: title.value.trim(),
    description: description.value.trim()
  };
  modal.value.close();
  emit('update', body);
}
</script>
