import React from 'react';
import './Header-Home.css';
import { Link } from "react-router-dom";
import { useTheme } from '../../contexts/ThemeContext';


const Header = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
  <header className="header">
    <div className="header-container">
      {/* Left nav */}
      <nav className="nav-left">
        <a href="/service">Service</a>
        <a href="/story">Story</a>
        <a href="/blog">Blog</a>
        <Link to="/media">Media</Link>
      </nav>

      {/* Center logo */}
      <div className="logo-wrapper">
        <a href="/">
          <img src="/logo.svg" alt="Golden Madina Logo" className="logo" />
        </a>
      </div>

      {/* Right nav */}
      <nav className="nav-right">
        <a href="/contact">Contact</a>
        <div className="language-dropdown">
          <button 
            className="language-button"
            onClick={() => {
              const options = document.querySelector('.language-options');
              options.classList.toggle('show');
            }}
          >
            <span>EN</span>
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="language-options">
            <div className="language-option">English</div>
            <div className="language-option">Français</div>
            <div className="language-option">العربية</div>
          </div>
        </div>
        
        {/* Theme Toggle Button */}
        <button 
          className="theme-toggle-button"
          onClick={toggleTheme}
          title={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
        >
          {isDark ? (
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

        {/* Search Button */}
        <button 
          className="search-button"
          onClick={() => {
            // Fonctionnalité de recherche à implémenter
            console.log('Recherche cliquée');
          }}
          title="Rechercher"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </nav>
    </div>
  </header>
  );
};

export default Header;
