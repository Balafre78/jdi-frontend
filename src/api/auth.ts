import api from './index'
import { useAuthStore } from '@/stores/auth'
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/api'

export async function login(body: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', body)
    const auth = useAuthStore()
    auth.login(response.data.user, response.data.token, response.data.expiresIn)
    return response.data
}

export async function register(body: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', body)
    const auth = useAuthStore()
    auth.login(response.data.user, response.data.token, response.data.expiresIn)
    return response.data
}
