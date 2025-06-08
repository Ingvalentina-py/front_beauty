// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { Link } from 'react-router-dom';
import '../components/Auth/AuthForm.css'; // reutiliza el CSS de los formularios

function LoginPage() {
  return (
    <div className="auth-form-container">
      <LoginForm />
      <p className="auth-link">
        ¿Nueva en Valentina’s Beauty?{' '}
        <Link to="/register">¡Regístrate aquí, hermosa!</Link>
      </p>
    </div>
  );
}

export default LoginPage;
