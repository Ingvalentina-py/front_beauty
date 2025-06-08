// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authService from '../api/authService'; // Crearemos este archivo

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Para cargar el estado inicial del usuario

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('userInfoToken');
            if (token) {
                try {
                    // Podrías validar el token aquí o simplemente obtener el perfil
                    // authService.setAuthToken(token); // Configura el token en axios
                    // const profile = await authService.getProfile(); // Si tienes una ruta /profile
                    // setUser(profile); // O decodificar el token para info básica
                    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
                    if (storedUser) {
                        setUser(storedUser);
                        authService.setAuthToken(token); // Asegúrate de que el token esté en las cabeceras de axios
                    } else {
                        localStorage.removeItem('userInfoToken');
                         localStorage.removeItem('userInfo');
                    }
                } catch (error) {
                    console.error("Error al inicializar auth:", error);
                    localStorage.removeItem('userInfoToken');
                    localStorage.removeItem('userInfo');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        localStorage.setItem('userInfoToken', data.token);
        localStorage.setItem('userInfo', JSON.stringify({ _id: data._id, username: data.username, email: data.email }));
        authService.setAuthToken(data.token);
        setUser({ _id: data._id, username: data.username, email: data.email });
        return data; // Devuelve para mensajes o redirecciones
    };

    const register = async (username, email, password) => {
        const data = await authService.register(username, email, password);
        localStorage.setItem('userInfoToken', data.token);
        localStorage.setItem('userInfo', JSON.stringify({ _id: data._id, username: data.username, email: data.email }));
        authService.setAuthToken(data.token);
        setUser({ _id: data._id, username: data.username, email: data.email });
        return data;
    };

    const logout = () => {
        localStorage.removeItem('userInfoToken');
        localStorage.removeItem('userInfo');
        authService.setAuthToken(null); // Limpia el token de axios
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);