<template>
  <nav
    class="w-full h-fit backdrop-blur-md border border-white/50 bg-white/5 flex rounded-xl shadow-lg p-4 items-center justify-between"
    aria-labelledby="navbar-heading"
  >
    <h2 id="navbar-heading" class="sr-only">Main navigation</h2>

    <ul class="flex gap-2 items-center">
      <li v-for="tab in tabs" :key="tab.label">
        <RouterLink
          :to="tab.to"
          class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer"
          :class="isActive(tab.to) ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/3'"
          :aria-current="isActive(tab.to) ? 'page' : undefined"
        >
          {{ tab.label }}
        </RouterLink>
      </li>
    </ul>

    <ul class="flex gap-2 items-center">
      <li class="h-full">
        <button
          @click="switchLanguage"
          class="inline-flex items-center rounded-md text-2xl font-medium transition-colors hover:cursor-pointer">
          {{ lang === 'en' ? '🇫🇷' : '🇬🇧' }}
        </button>
      </li>
      <li>
        <span
          v-if="isLoggedIn"
          class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white/70"
        >
          {{ t('navbar.hello') }} <span class="font-bold ml-1">{{ user?.firstName }}</span>
        </span>
        <button
          v-if="isLoggedIn"
          class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-red-600/20 text-white/70 hover:bg-red-600/10 hover:cursor-pointer"
          @click="logout"
        >
          {{ t('navbar.logout') }}
        </button>
        <RouterLink
          v-else
          to="/login"
          class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer bg-white/10 text-white/70 hover:bg-white/3"
          >{{ t('navbar.login') }}</RouterLink
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { useRoute, type RouteLocationRaw } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth.ts';
import type { User } from '@/types';
import router from '@/router';

const { t, locale } = useI18n();
const route = useRoute();
const auth = useAuthStore();

type NavTo = RouteLocationRaw | undefined
const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

const tabs = [
  { label: t('navbar.home'), to: { name: 'home' } },
  { label: t('navbar.lists'), to: { name: 'lists' } },
  { label: t('navbar.user'), to: { name: 'user' } },
  { label: t('navbar.about'), to: { name: 'about' } },
]

const isLoggedIn: ComputedRef<boolean> = computed(() => auth.isLoggedIn);
const user: ComputedRef<User | null> = computed(() => auth.user);
const lang = computed(() => locale.value)

const isActive = (to: NavTo) => {
  if (!to) return false;
  if (typeof to === 'string') return route.path === to;
  if (isObject(to)) {
    if ('name' in to && to.name != null) return route.name === (to.name as string | symbol);
    if ('path' in to && to.path != null) return route.path === String(to.path);
  }
  return false;
}

function switchLanguage(): void {
  locale.value = locale.value === 'en' ? 'fr' : 'en'
  localStorage.setItem('locale', locale.value)
}

function logout(): void {
  auth.logout();
  router.push({ name: 'home' });
}
</script>

<style scoped></style>
