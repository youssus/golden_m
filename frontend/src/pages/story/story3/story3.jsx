import React from 'react';
import './story3.css';
import { useTheme } from '../../../contexts/ThemeContext';

const Story3 = () => {
  const { theme } = useTheme();

  return (
    <div className={`story3-container ${theme}`}>
      {/* Titre principal */}
      <div className="story3-header">
        <h1 className="story3-title">Les Fondateurs</h1>
      </div>

      {/* Image centrale */}
      <div className="story3-image-container">
        <img 
          src="/fondateur.png" 
          alt="Les Fondateurs" 
          className="story3-image"
        />
      </div>

      {/* Section des fondateurs */}
      <div className="story3-founders">
        <div className="founder-column">
          <h3 className="founder-name">Reayen El Manai</h3>
          <p className="founder-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div className="founder-column">
          <h3 className="founder-name">Med Sherif Arfaoui</h3>
          <p className="founder-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Story3;
