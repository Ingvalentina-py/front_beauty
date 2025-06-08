
// src/pages/ChatPage.jsx
import React from 'react';
import ChatWindow from '../components/Chat/ChatWindow';
import { useAuth } from '../context/AuthContext';
import './ChatPage.css';

function ChatPage() {
  const { user } = useAuth();

  if (!user) {
    return <p className="loading-chat">Cargando tu sesión de Valentina’s Beauty…</p>;
  }

  return (
    <div className="chat-page-container">
      <header className="chat-page-header">
        <h1>Habla con Celestia</h1>
        <p>¡Prepárate para brillar, {user.username}!</p>
      </header>
      <ChatWindow />
    </div>
  );
}

export default ChatPage;

