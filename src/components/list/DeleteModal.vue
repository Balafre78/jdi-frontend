<template>
  <Modal ref="modal" :title="t('lists.form.delete.text.title')">
    <template #trigger>
      <slot/>
    </template>
    <template #content>
      <div class="space-y-4 flex flex-col w-full">
        <p class="text-white">{{ t('lists.form.delete.text.description')}}</p>
        <div class="flex gap-4 justify-end">
          <button @click="cancel" class="flex rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-4 py-2">
            {{ t('lists.form.delete.button.cancel') }}
          </button>
          <button @click="confirm" class="flex rounded-full bg-red-500 hover:bg-red-800 disabled:opacity-60 text-white font-medium px-4 py-2">
            {{ t('lists.form.delete.button.delete') }}
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/common/Modal.vue';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { t } = useI18n();

const modal = ref(Modal);

const emit = defineEmits<{
  (e: 'confirm'): void,
  (e: 'cancel'): void
}>()

async function confirm() {
  modal.value.close();
  emit('confirm');
}

async function cancel() {
  modal.value.close();
  emit('cancel');
}
</script>
