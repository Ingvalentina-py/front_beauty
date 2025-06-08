// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>¡Bienvenida a Valentina’s Beauty!</h1>
        <p>Tu espacio de accesorios que realzan tu estilo y empoderan tu belleza.</p>
      </header>

      <main className="homepage-content">
        {isAuthenticated && user ? (
          <div className="user-welcome">
            <h2>¡Hola, {user.username}!</h2>
            <p>Celestia está lista para darte las mejores recomendaciones.</p>
            <Link to="/chat" className="homepage-button primary">
              Chatear con Celestia
            </Link>
          </div>
        ) : (
          <div className="guest-welcome">
            <h2>¿Lista para brillar?</h2>
            <p>Únete a nuestra comunidad y descubre los accesorios perfectos para ti.</p>
            <div className="homepage-actions">
              <Link to="/login" className="homepage-button primary">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="homepage-button secondary">
                Registrarme
              </Link>
            </div>
          </div>
        )}
      </main>

      <footer className="homepage-footer">
        <p>&copy; {new Date().getFullYear()} Valentina’s Beauty. ¡Brilla con estilo!</p>
      </footer>
    </div>
  );
}

export default HomePage;
