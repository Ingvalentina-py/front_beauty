
// src/components/Chat/MessageInput.jsx
import React, { useState } from 'react';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './MessageInput.css';

const MessageInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <motion.form
      className="message-input-container"
      onSubmit={handleSubmit}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="message-input-wrapper">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Parcera, cuéntame tu consulta de estilo..."
          disabled={isLoading}
          className="message-input"
        />
        <motion.button
          type="submit"
          className="send-button"
          disabled={!message.trim() || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <FaSpinner className="spinner" />
          ) : (
            <FaPaperPlane className="send-icon" />
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default MessageInput;

