<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { PropType } from 'vue'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const props = defineProps({
  icon: {
    type: Object as PropType<IconDefinition>,
    default: undefined
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  variant: {
    type: String as PropType<'primary' | 'ghost' | 'danger'>,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>()

const slots = useSlots()

const hasOnlyIcon = computed(() => !props.label && !slots.label && !slots.default)

const variantClasses: Record<string, string> = {
  primary: 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700',
  ghost: 'bg-transparent text-white border-slate-300 hover:border-slate-400 hover:bg-slate-700',
  danger: 'bg-red-500 text-white border-red-600 hover:bg-red-700 hover:border-red-700'
}

const buttonClasses = computed(() => {
  const base =
    'inline-flex items-center gap-2 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none'
  const size = hasOnlyIcon.value ? 'px-3' : 'px-3 py-2'
  const variant = variantClasses[props.variant] ?? variantClasses.primary
  return [base, size, variant].join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

const ariaLabel = computed(() => props.label || (props.icon ? 'icon button' : 'button'))
const titleAttr = computed(() => (props.label ? props.label : undefined))
</script>

<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    v-bind:title="titleAttr"
    @click="handleClick"
  >
    <span class="icon-button__icon">
      <slot name="icon">
        <FontAwesomeIcon v-if="icon" :icon="icon" />
      </slot>
    </span>
    <span v-if="label" class="icon-button__label">
      <slot name="label">{{ label }}</slot>
    </span>
    <slot />
  </button>
</template>

<style scoped>
.icon-button__icon :deep(svg) {
  width: 1rem;
  height: 1rem;
}
</style>
