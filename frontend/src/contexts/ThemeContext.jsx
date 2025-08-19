import React, { createContext, useContext, useState, useEffect } from 'react';

// Créer le contexte du thème
const ThemeContext = createContext();

// Hook personnalisé pour utiliser le contexte du thème
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider du thème
export const ThemeProvider = ({ children }) => {
  // Récupérer le thème sauvegardé ou utiliser 'light' par défaut
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('golden-madina-theme');
    return savedTheme || 'light';
  });

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Sauvegarder le thème dans localStorage et appliquer la classe CSS
  useEffect(() => {
    localStorage.setItem('golden-madina-theme', theme);
    
    // Appliquer la classe de thème au body
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    
    // Ajouter l'attribut data-theme pour les sélecteurs CSS
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
