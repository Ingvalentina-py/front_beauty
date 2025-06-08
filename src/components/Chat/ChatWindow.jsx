
// src/components/Chat/ChatWindow.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import * as chatService from '../../api/chatService';
import './ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const history = await chatService.getConversationHistory();
        const formattedHistory = history.map((msg, idx) => ({
          ...msg,
          id: msg.id || `history-${Date.now()}-${idx}`,
          timestamp: msg.timestamp || new Date().toISOString(),
        }));
        setMessages(formattedHistory);
      } catch (err) {
        console.error('Error al cargar el historial:', err);
        setError('Error al cargar tu chat. Intentá recargar o más tarde.');
        setMessages([
          {
            id: `error-${Date.now()}`,
            sender: 'assistant',
            text: 'Celestia no pudo cargar tu historial. ¡Intentá de nuevo!',
            timestamp: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const { botResponse } = await chatService.sendMessage(text);
      const formattedBotResponse = {
        ...botResponse,
        id: `bot-${Date.now()}`,
        timestamp: botResponse.timestamp || new Date().toISOString(),
      };
      setMessages((prev) => [...prev, formattedBotResponse]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      setError('Celestia está ocupada, no pudo responder. Intentá de nuevo.');
      const errorBotMessage = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text: 'Hubo un problema comunicándote con Valentina’s Beauty. Intentá más tarde.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="chat-window"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="chat-header justify-between">
        <FaRobot className="chat-icon" />
        <h2>Asistente de Valentina’s Beauty</h2>
      </div>

      <div className="chat-messages">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MessageList messages={[message]} />
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            className="loading-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaSpinner className="spinner" />
            <span>Celestia está escribiendo...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </motion.div>
  );
};

export default ChatWindow;

