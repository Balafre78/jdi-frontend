import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
//import { useRouter } from 'vue-router'
import router from '@/router'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
});

api.interceptors.request.use((config) => {
    const auth = useAuthStore();
    if (auth.isLoggedIn && auth.token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config;
});

api.interceptors.response.use((res) => res, (err) => {
    const auth = useAuthStore();
    //const router = useRouter();
    if (err.response?.status === 401 && auth.isLoggedIn) {
        auth.logout();
        router.push({ name: 'login' });
    }
    return Promise.reject(err);
});

export default api;
