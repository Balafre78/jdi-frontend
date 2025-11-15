<template>
  <div class="flex flex-col">
    <label :for="id" class="text-white mb-2" :class="!showLabel ? 'sr-only' : ''">{{ label }}</label>
    <textarea
      :id="id"
      :name="id"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      autofocus
      class="w-full rounded-3xl px-4 py-3 min-h-20 max-h-60 h-20 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  id: {
    type: String,
    required: true
  },
  showLabel: {
    type: Boolean,
    required: false,
    default: true
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const onInput = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>
