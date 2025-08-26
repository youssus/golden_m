import React, { useState } from 'react';
import './navbar.css';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Ici vous pouvez ajouter la logique pour ouvrir/fermer la recherche
  };

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Conteneur unifié pour le bouton retour */}
        <div className="back-container">
          <a
            href="#"
            className="back-button"
            aria-label="Back to previous"
            onClick={goBack}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </a>

          {/* Texte "Page d'accueil" */}
          <a href="#" className="page-title" onClick={goBack}>
            Retourner
          </a>
        </div>

        {/* Logo Golden Madina */}
        <div className="logo-container">
          <img
            src="/logo.svg"
            alt="Golden Madina Logo"
            className="logo"
          />
        </div>

        {/* Actions Icons */}
        <div className="actions-container">
          {/* Bouton de recherche */}
          <button
            className={`action-button search-button ${isSearchOpen ? 'active' : ''}`}
            onClick={toggleSearch}
            aria-label="Search"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>

          {/* Bouton de changement de thème */}
          <button
            className={`action-button theme-toggle ${isDark ? 'dark' : 'light'}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? (
              // Icône de lune pour le mode sombre
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            ) : (
              // Icône de soleil pour le mode clair
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
