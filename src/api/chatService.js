// src/api/chatService.js
import { apiClient } from './authService'; // Usa la instancia de apiClient configurada

export const sendMessage = async (message) => {
    const response = await apiClient.post('/api/chat/send', { message });
    return response.data; // { userMessage: {}, botResponse: {} }
};

export const getConversationHistory = async () => {
    const response = await apiClient.get('/api/chat/history');
    return response.data; // Array de mensajes
};