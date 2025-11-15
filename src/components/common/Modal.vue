<template>
  <span @click="open = true">
    <!-- Anything clicked in this slot will open the modal -->
    <slot name="trigger" />
  </span>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black/70"/>
      <div class="relative z-10 w-full max-w-md backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg p-4">
        <header class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-white">{{ title }}</h2>
          <button class="text-gray-400 hover:text-white text-xl font-bold" @click="close">✕</button>
        </header>
        <slot name="content"/>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  }
});

const emit = defineEmits<{
  (e: 'close'): void
}>();

const open = ref(false);

function close() {
  open.value = false;
  emit('close');
}

defineExpose({ close })
</script>
