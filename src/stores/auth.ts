import { defineStore } from 'pinia'
import type { User } from "@/types/api.ts";

interface AuthState {
  user: User | null
  token: string | null
  expires: number | null // timestamp in ms
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    expires: null
  }),
  getters: {
    isLoggedIn: (state): boolean => {
      if (!state.user || !state.token || !state.expires) return false
      return Date.now() < state.expires
    }
  },
  actions: {
    login(user: User, token: string, expiresInSeconds: number) {
      this.user = user
      this.token = token
      this.expires = Date.now() + expiresInSeconds * 1000

      this.saveToStorage()
    },
    logout() {
      this.user = null
      this.token = null
      this.expires = null

      localStorage.removeItem('auth')
    },
    saveToStorage() {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          user: this.user,
          token: this.token,
          expires: this.expires
        })
      )
    },
    loadFromStorage() {
      const raw = localStorage.getItem('auth')
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as AuthState
          this.user = parsed.user
          this.token = parsed.token
          this.expires = parsed.expires
        } catch {
          this.logout()
        }
      }
    }
  }
})
