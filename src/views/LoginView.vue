<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)

function submit() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs.'
    return
  }
  submitting.value = true
  // Simuler une requête asynchrone
  setTimeout(() => {
    submitting.value = false
    console.log('Login attempt', { email: email.value, password: password.value })
    // reset ou redirection selon le besoin
  }, 700)
}
</script>

<template>
  <div class="login min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md mx-4">
      <form @submit.prevent="submit" class="backdrop-blur-md border border-white rounded-xl shadow-lg p-8" role="form" aria-labelledby="login-heading">
        <h2 id="login-heading" class="text-2xl font-semibold text-white mb-6 text-center">Login</h2>

        <div class="space-y-4">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input id="email" name="email" v-model="email" type="email" autocomplete="email" placeholder="Email" autofocus class="w-full rounded-full px-4 py-3 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white" />
          </div>

          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" v-model="password" type="password" autocomplete="current-password" placeholder="Password" class="w-full rounded-full px-4 py-3 bg-transparent border border-white placeholder-white/80 text-white caret-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white" />
          </div>

          <div class="flex items-center justify-between text-sm text-white">
            <label class="flex items-center"><input type="checkbox" class="mr-2" name="remember" />Remember</label>
            <RouterLink to="/forgot-password" class="font-medium underline hover:text-indigo-200">Forgot password?</RouterLink>
          </div>

          <div>
            <button type="submit" :disabled="submitting" :aria-busy="submitting" class="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-4 py-2">
              <span v-if="!submitting">Login</span>
              <span v-else>Login in...</span>
            </button>
          </div>

          <div class="text-center mt-4">
            <p class="text-sm text-white">Doesn't have an account? <RouterLink to="/register" class="font-medium underline hover:text-indigo-200">Register here.</RouterLink></p>
          </div>

          <p v-if="error" role="status" aria-live="polite" class="text-sm text-red-200 bg-red-600/30 p-2 rounded-md">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login {
  /* conserve l'image d'arrière-plan fournie */
  background-image: url('/src/assets/img/bg.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
}

/* Si nécessaire, on peut augmenter l'opacité de la couche pour un meilleur contraste */
</style>
