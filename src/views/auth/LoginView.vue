<template>
  <div class="w-full max-w-md mx-4">
    <div
      class="backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg p-8"
      aria-labelledby="login-heading"
    >
      <h2 id="login-heading" class="text-2xl font-semibold text-white mb-6 text-center">
        {{ t('login.form.text.title') }}
      </h2>

      <div class="space-y-4">
        <InputField
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          :label="t('login.form.input.email.label')"
          :placeholder="t('login.form.input.email.placeholder')"
          :show-label="false"
        />
        <InputField
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          :label="t('login.form.input.password.label')"
          :placeholder="t('login.form.input.password.placeholder')"
          :show-label="false"
        />

        <div class="flex items-center justify-between text-sm text-white">
          <label class="flex items-center"
          ><input type="checkbox" class="mr-2" name="remember" />{{
              t('login.form.link.rememberPassword')
            }}</label
          >
          <RouterLink to="/forgot-password" class="font-medium underline hover:text-indigo-200">{{
              t('login.form.link.forgotPassword')
            }}</RouterLink>
        </div>

        <div>
          <button
            @click="submit"
            :disabled="submitting"
            :aria-busy="submitting"
            class="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-4 py-2"
          >
            <span v-if="!submitting">{{ t('login.form.button.login') }}</span>
            <span v-else>{{ t('login.form.button.loggingIn') }}</span>
          </button>
        </div>

        <div class="text-center mt-4">
          <p class="text-sm text-white">
            {{ t('login.form.text.noAccount') }}
            <RouterLink to="/register" class="font-medium underline hover:text-indigo-200">{{
                t('login.form.link.register')
              }}</RouterLink
            >.
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
import { type Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { login } from '@/api/auth.ts';
import type { LoginRequest } from '@/types';
import InputField from '@/components/common/InputField.vue'

const email: Ref<string> = ref('');
const password: Ref<string>  = ref('');
const error: Ref<string>  = ref('');
const submitting: Ref<boolean>  = ref(false);

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

async function submit() {
  error.value = '';
  if (!email.value) {
    error.value = t('login.form.error.missingEmail');
    return;
  } else if (!password.value) {
    error.value = t('login.form.error.missingPassword');
    return;
  }
  submitting.value = true;

  const body: LoginRequest = {
    email: email.value.trim(),
    password: password.value,
  };

  try {
    await login(body);
    // Redirect after successful login if redirect query param exists
    const redirect = (route.query.redirect as string) || '/';
    await router.push(redirect);
  } catch (err: any) {
    if (err.response?.data?.error) {
      error.value = err.response.data.error;
    } else {
      error.value = 'network';
    }
  }
  submitting.value = false;
}
</script>
