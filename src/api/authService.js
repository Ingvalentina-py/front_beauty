// src/api/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/auth';

// Configuración global de Axios para incluir el token si está disponible
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
});

export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

// Al cargar la app, intenta configurar el token si existe
const token = localStorage.getItem('userInfoToken');
if (token) {
    setAuthToken(token);
}

export const register = async (username, email, password) => {
    const response = await apiClient.post('/auth/register', { username, email, password });
    return response.data;
};

export const login = async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
};

export const getProfile = async () => { // Opcional, si la usas en AuthContext
    const response = await apiClient.get('/auth/profile');
    return response.data;
};

// Exporta apiClient si necesitas usarlo directamente en otros servicios
export { apiClient };