<template>
  <div class="w-full max-w-md mx-4">
    <div
      class="backdrop-blur-lg border border-white/50 bg-white/5 rounded-xl shadow-lg p-8"
      role="form"
      aria-labelledby="register-heading"
    >
      <h2 id="register-heading" class="text-2xl font-semibold text-white mb-6 text-center">
        {{ t('register.form.text.title') }}
      </h2>
      <div class="space-y-4">
        <div class="flex space-x-3">
          <InputField
            id="firstName"
            v-model="firstName"
            type="text"
            autocomplete="firstName"
            class="w-1/2"
            :label="t('register.form.input.firstName.label')"
            :placeholder="t('register.form.input.firstName.placeholder')"
            :show-label="false"
          />
          <InputField
            id="lastName"
            v-model="lastName"
            type="text"
            autocomplete="lastName"
            class="w-1/2"
            :label="t('register.form.input.lastName.label')"
            :placeholder="t('register.form.input.lastName.placeholder')"
            :show-label="false"
          />
        </div>
        <InputField
          id="username"
          v-model="username"
          type="text"
          autocomplete="username"
          :label="t('register.form.input.username.label')"
          :placeholder="t('register.form.input.username.placeholder')"
          :show-label="false"
        />
        <InputField
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          :label="t('register.form.input.email.label')"
          :placeholder="t('register.form.input.email.placeholder')"
          :show-label="false"
        />
        <InputField
          id="password"
          v-model="password"
          type="password"
          autocomplete="new-password"
          :label="t('register.form.input.password.label')"
          :placeholder="t('register.form.input.password.placeholder')"
          :show-label="false"
        />
        <InputField
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          autocomplete="new-password"
          :label="t('register.form.input.confirmPassword.label')"
          :placeholder="t('register.form.input.confirmPassword.placeholder')"
          :show-label="false"
        />
        <div>
          <button
            @click="submit"
            :disabled="submitting"
            :aria-busy="submitting"
            class="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-4 py-2"
          >
            <span v-if="!submitting">{{ t('register.form.button.register') }}</span>
            <span v-else>{{ t('register.form.button.registering') }}</span>
          </button>
        </div>
        <div class="text-center mt-4">
          <p class="text-sm text-white">
            {{ t('register.form.text.haveAccount') }}
            <RouterLink to="/login" class="font-medium underline hover:text-indigo-200">{{
                t('register.form.link.login')
              }}</RouterLink>
          </p>
        </div>
        <p
          v-if="error"
          role="status"
          aria-live="polite"
          class="text-sm text-red-200 bg-red-600/30 p-2 rounded-md"
        >
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { RegisterRequest } from '@/types'
import { register } from '@/api/auth.ts'
import InputField from '@/components/common/InputField.vue'

const firstName: Ref<string> = ref('')
const lastName: Ref<string>  = ref('')
const username: Ref<string>  = ref('')
const email: Ref<string>  = ref('')
const password: Ref<string>  = ref('')
const confirmPassword: Ref<string>  = ref('')
const error: Ref<string>  = ref('')
const submitting: Ref<boolean>  = ref(false)

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

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
    password: password.value,
  };

  try {
    await register(body);
    // Redirect after successful registration if redirect query param exists
    const redirect = (route.query.redirect as string) || '/';
    await router.push(redirect);
  } catch (err: any) {
    if (err.response?.data) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Network error or server unreachable';
    }
  }
  submitting.value = false;
}
</script>
