// src/pages/RegisterPage.jsx
import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { Link } from 'react-router-dom';
import '../components/Auth/AuthForm.css'; // Reutiliza el CSS para el contenedor

function RegisterPage() {
    return (
        <div className="auth-form-container">
            <RegisterForm />
            <p className="auth-link">
                ¿Ya tienes una cuenta, bonita? <Link to="/login">¡Inicia Sesión!</Link>
            </p>
        </div>
    );
}

export default RegisterPage;