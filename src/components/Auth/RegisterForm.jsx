// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Un CSS compartido para los formularios de Auth

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError]       = useState('');
  const [message, setMessage]   = useState('');
  const { register }            = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!username || !email || !password || !confirmPassword) {
      setError('¡Todos los campos son obligatorios, reina!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. ¡Revísalas porfi!');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres. ¡Dale fuerte a esa clave!');
      return;
    }

    try {
      const data = await register(username, email, password);
      setMessage(data.message || '¡Registro exitoso! Prepárate para lucir tus accesorios.');
      setTimeout(() => {
        navigate('/chat');
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Error al registrarte. ¿Ese email ya está en uso?'
      );
      console.error(err);
    }
  };

  return (
    <div className="auth-form-container text-left">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="text-xl font-semibold mb-4">
          ¡Bienvenida a Valentina’s Beauty!
        </h2>
        {error   && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <div className="form-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-button">
          ¡Registrarme!
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
