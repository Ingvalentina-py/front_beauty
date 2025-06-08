
// src/components/Chat/MessageList.jsx
import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './MessageList.css';

const MessageList = ({ messages }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!messages || messages.length === 0) {
    return (
      <div className="message-list empty">
        <div className="empty-message">
          <FaRobot className="empty-icon" />
          <p>¡Empieza a chatear con Celestia, tu asesora de Valentina’s Beauty!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <motion.div
          key={message.id || `msg-${Date.now()}-${Math.random()}`}
          className={`message ${message.sender}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="message-header">
            {message.sender === 'user' ? (
              <FaUser className="message-icon user-icon" />
            ) : (
              <FaRobot className="message-icon assistant-icon" />
            )}
            <span className="message-sender">
              {message.sender === 'user' ? 'Tú' : 'Celestia'}
            </span>
          </div>
          <div className="message-content">
            {message.text}
          </div>
          <div className="message-timestamp">
            {formatTime(message.timestamp)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MessageList;

