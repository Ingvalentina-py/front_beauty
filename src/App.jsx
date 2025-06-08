
// src/App.jsx 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';

import './App.css';

// Componente para Rutas Protegidas
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="section text-center">
        <div className="card">
          <h2>Verificando tu sesión…</h2>
          <p>Un momentico, parcerita…</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Componente para Rutas Públicas
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="section text-center">
        <div className="card">
          <h2>Cargando Valentina’s Beauty…</h2>
          <p>Preparando tu experiencia de estilo 💖</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/chat" replace /> : children;
}

// Componente auxiliar para rutas no encontradas
function NavigateToHomeOrChat() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="section text-center">
        <div className="card">
          <h2>Redirigiendo…</h2>
          <p>Un momentico…</p>
        </div>
      </div>
    );
  }

  return isAuthenticated
    ? <Navigate to="/chat" replace />
    : <Navigate to="/" replace />;
}

// Componente Principal de la Aplicación
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <div className="container">
              <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <RegisterPage />
                    </PublicRoute>
                  }
                />

                {/* Rutas Protegidas */}
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute>
                      <ChatPage />
                    </ProtectedRoute>
                  }
                />

                {/* Redirección para rutas no encontradas */}
                <Route path="*" element={<NavigateToHomeOrChat />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

