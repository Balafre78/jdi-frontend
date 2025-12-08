<template>
  <Modal ref="modal" :title="t('lists.form.editTask.text.title')">
    <template #trigger>
      <slot />
    </template>
    <template #content>
      <div class="space-y-4 flex flex-col">
        <InputField
          id="name"
          :label="t('lists.form.editTask.input.name.label')"
          :placeholder="t('lists.form.editTask.input.name.placeholder')"
          v-model="name"
        />
        <TextField
          id="description"
          :label="t('lists.form.editTask.input.description.label')"
          :placeholder="t('lists.form.editTask.input.description.placeholder')"
          v-model="description"
        />
        <button
          @click="submit"
          class="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-4 py-2"
        >
          {{ t('lists.form.editTask.button.edit') }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/common/Modal.vue'
import InputField from '@/components/common/InputField.vue'
import TextField from '@/components/common/TextField.vue'
import type { Task, UpdateTaskRequest } from '@/types'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()

const modal = ref(Modal)
const { task } = defineProps<{
  task: Task
}>()
const name = ref(task.name)
const description = ref(task.description)

const emit = defineEmits<{
  (e: 'update', body: UpdateTaskRequest): void
}>()

async function submit() {
  const body: UpdateTaskRequest = {
    name: name.value.trim(),
    description: description.value.trim(),
  }
  modal.value.close()
  emit('update', body)
}
</script>
