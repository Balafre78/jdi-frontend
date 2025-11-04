<script setup lang="ts">
import { useRoute, type RouteLocationRaw } from 'vue-router'

const route = useRoute()

type NavTo = RouteLocationRaw | undefined
const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

const tabs = [
  { label: 'Home', to: { name: 'home' } },
  { label: 'My todolists', to: { name: 'lists' } },
  { label: 'About', to: { name: 'about' } },
]

const isActive = (to: NavTo) => {
  if (!to) return false
  if (typeof to === 'string') return route.path === to
  if (isObject(to)) {
    if ('name' in to && to.name != null) return route.name === (to.name as string | symbol)
    if ('path' in to && to.path != null) return route.path === String(to.path)
  }
  return false
}
</script>

<template>
  <nav class="w-full h-fit backdrop-blur-md border border-white/50 bg-white/5 flex rounded-xl shadow-lg p-4 items-center justify-between" aria-labelledby="navbar-heading">
    <h2 id="navbar-heading" class="sr-only">Main navigation</h2>

    <ul class="flex gap-2 items-center">
      <li v-for="tab in tabs" :key="tab.label">
        <RouterLink
          :to="tab.to"
          class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors"
          :class="isActive(tab.to) ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/3'"
          :aria-current="isActive(tab.to) ? 'page' : undefined"
        >
          {{ tab.label }}
        </RouterLink>
      </li>
    </ul>

    <ul class="flex gap-2 items-center">
      <li>
        <RouterLink
          to="/login"
          class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors"
          :class="isActive('login') ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/3'"
          :aria-current="isActive('login') ? 'page' : undefined"
        >Login</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
</style>

