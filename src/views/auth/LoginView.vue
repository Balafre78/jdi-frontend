<template>
  <div class="login min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md mx-4">
      <div class="backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg p-8" aria-labelledby="login-heading">
        <h2 id="login-heading" class="text-2xl font-semibold text-white mb-6 text-center">{{ t('login.form.text.title') }}</h2>

        <div class="space-y-4">
          <div>
            <label for="email" class="sr-only">{{ t('login.form.input.email.label') }}</label>
            <input id="email" name="email" v-model="email" type="email" autocomplete="email" :placeholder="t('login.form.input.email.placeholder')" autofocus class="w-full rounded-full px-4 py-3 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white" />
          </div>

          <div>
            <label for="password" class="sr-only">{{ t('login.form.input.password.label') }}</label>
            <input id="password" name="password" v-model="password" type="password" autocomplete="current-password" :placeholder="t('login.form.input.password.placeholder')" class="w-full rounded-full px-4 py-3 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white" />
          </div>

          <div class="flex items-center justify-between text-sm text-white">
            <label class="flex items-center"><input type="checkbox" class="mr-2" name="remember" />{{ t('login.form.link.rememberPassword') }}</label>
            <RouterLink to="/forgot-password" class="font-medium underline hover:text-indigo-200">{{ t('login.form.link.forgotPassword') }}</RouterLink>
          </div>

          <div>
            <button @click="submit" :disabled="submitting" :aria-busy="submitting" class="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-4 py-2">
              <span v-if="!submitting">{{ t('login.form.button.login') }}</span>
              <span v-else>{{ t('login.form.button.loggingIn') }}</span>
            </button>
          </div>

          <div class="text-center mt-4">
            <p class="text-sm text-white">{{ t('login.form.text.noAccount')}} <RouterLink to="/register" class="font-medium underline hover:text-indigo-200">{{ t('login.form.link.register')}}</RouterLink>.</p>
          </div>

          <p v-if="error" role="status" aria-live="polite" class="text-sm text-red-200 bg-red-600/30 p-2 rounded-md">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const email = ref('');
const password = ref('');
const error = ref('');
const submitting = ref(false);

const { t } = useI18n();

function submit() {
  error.value = '';
  if (!email.value) {
    error.value = t('login.form.error.missingEmail');
    return;
  } else if (!password.value) {
    error.value = t('login.form.error.missingPassword');
    return;
  }
  submitting.value = true
  setTimeout(() => {
    submitting.value = false;
    console.log('Login attempt', { email: email.value, password: password.value });
  }, 700);
}
</script>

<style scoped>
.login {
  /* conserve l'image d'arrière-plan fournie */
  background-image: url('/src/assets/img/background.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
}

/* Si nécessaire, on peut augmenter l'opacité de la couche pour un meilleur contraste */
</style>
