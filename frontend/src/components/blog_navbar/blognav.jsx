import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './blognav.css';

const BlogNav = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="blognav">
      <div className="blognav-container">
        {/* Bouton Retour à gauche */}
        <div className="blognav-left">
          <Link to="/blog" className="blognav-back-btn">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M19 12H5M12 19L5 12L12 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span>Retour au blog</span>
          </Link>
        </div>

        {/* Logo centré */}
        <div className="blognav-center">
          <Link to="/" className="blognav-logo">
            <img src="/logo.svg" alt="Golden Madina" />
          </Link>
        </div>

        {/* Bouton mode sombre à droite */}
        <div className="blognav-right">
          <button 
            id="blognav-theme-toggle"
            onClick={toggleTheme} 
            className="blognav-theme-toggle" 
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
          >
            {theme === 'dark' ? (
              // Icône soleil pour mode clair
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="theme-icon"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              // Icône lune pour mode sombre
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="theme-icon"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default BlogNav;
