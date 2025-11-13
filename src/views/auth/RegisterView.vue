<template>
  <div class="register min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md mx-4">
      <div class="backdrop-blur-lg border border-white/50 bg-white/5 rounded-xl shadow-lg p-8" role="form" aria-labelledby="register-heading">
        <h2 id="register-heading" class="text-2xl font-semibold text-white mb-6 text-center">{{ t('register.form.text.title') }}</h2>
        <div class="space-y-4">
          <div class="flex space-x-3">
            <div class="w-1/2">
              <label for="firstName" class="sr-only">{{ t('register.form.input.name.label') }}</label>
              <input id="firstName" name="firstName" v-model="firstName" type="text" autocomplete="firstName" :placeholder="t('register.form.input.firstName.placeholder')" autofocus class="w-full rounded-full px-4 py-3 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white" />
            </div>
            <div class="w-1/2">
              <label for="lastName" class="sr-only">{{ t('register.form.input.lastName.label') }}</label>
              <input id="lastName" name="lastName" v-model="lastName" type="text" autocomplete="lastName" :placeholder="t('register.form.input.lastName.placeholder')" autofocus class="w-full rounded-full px-4 py-3 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white" />
            </div>
          </div>
          <div>
            <label for="username" class="sr-only">{{ t('register.form.input.username.label') }}</label>
            <input id="username" name="username" v-model="username" type="text" autocomplete="username" :placeholder="t('register.form.input.username.placeholder')" class="w-full rounded-full px-4 py-3 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white" />
          </div>
          <div>
            <label for="email" class="sr-only">{{ t('register.form.input.email.label') }}</label>
            <input id="email" name="email" v-model="email" type="email" autocomplete="email" :placeholder="t('register.form.input.email.placeholder')" class="w-full rounded-full px-4 py-3 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white" />
          </div>
          <div>
            <label for="password" class="sr-only">{{ t('register.form.input.password.label') }}</label>
            <input id="password" name="password" v-model="password" type="password" autocomplete="new-password" :placeholder="t('register.form.input.password.placeholder')" class="w-full rounded-full px-4 py-3 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white" />
          </div>
          <div>
            <label for="confirm" class="sr-only">{{ t('register.form.input.confirmPassword.label') }}</label>
            <input id="confirm" name="confirm" v-model="confirmPassword" type="password" autocomplete="new-password" :placeholder="t('register.form.input.confirmPassword.placeholder')" class="w-full rounded-full px-4 py-3 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white" />
          </div>
          <div>
            <button @click="submit" :disabled="submitting" :aria-busy="submitting" class="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-4 py-2">
              <span v-if="!submitting">{{ t('register.form.button.register') }}</span>
              <span v-else>{{ t('register.form.button.registering') }}</span>
            </button>
          </div>
          <div class="text-center mt-4">
            <p class="text-sm text-white">{{ t('register.form.text.haveAccount') }} <router-link to="/login" class="font-medium underline hover:text-indigo-200">{{ t('register.form.link.login') }}</router-link></p>
          </div>
          <p v-if="error" role="status" aria-live="polite" class="text-sm text-red-200 bg-red-600/30 p-2 rounded-md">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { RegisterRequest } from '@/types/api.ts'
import { register } from '@/api/auth.ts'

const firstName = ref('');
const lastName = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const submitting = ref(false);

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

async function submit() {
  error.value = '';
  if (!firstName.value) {
    error.value = t('register.form.error.requiredFirstName');
    return;
  }
  if (!lastName.value) {
    error.value = t('register.form.error.requiredLastName');
    return;
  }
  if (!username.value) {
    error.value = t('register.form.error.requiredUsername');
    return;
  }
  if (!email.value) {
    error.value = t('register.form.error.requiredEmail');
    return;
  }
  if (!password.value) {
    error.value = t('register.form.error.requiredPassword');
    return;
  }
  if (!confirmPassword.value) {
    error.value = t('register.form.error.requiredPassword');
    return;
  }
  if (password.value !== confirmPassword.value) {
    error.value = t('register.form.error.passwordMismatch');
    return;
  }
  if (password.value.length < 6) {
    error.value = t('register.form.error.passwordTooShort');
    return;
  }

  submitting.value = true;

  const body: RegisterRequest = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    username: username.value,
    password: password.value
  }

  try {
    await register(body);
    const redirect = route.query.redirect as string || '/';
    await router.push(redirect);
  } catch (err: any) {
    if (err.response?.data) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Network error or server unreachable';
    }
  }
}
</script>

<style scoped>
.register {
  background-image: url('/src/assets/img/background.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>
