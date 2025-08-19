import React from 'react';
import './story1.css';
import { useTheme } from '../../../contexts/ThemeContext';

const VideoPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`story1-container ${theme}`}>
      <video className="video-player" controls>
        <source src="/10.mp4" type="video/mp4" />
      </video>

      <div className={`story-page ${theme}`}>
        {/* Hero Section avec image */}
        <div className="hero-section">
          {/* Citation principale */}
          <div className="hero-quote">
            <h1 className="quote-text">
              " consectetur adipiscing elit, sed diam<br />
              tincidunt ut laoreet dolore magna "
            </h1>
            <p className="quote-author">
              sed diam nonummy nibh euismod
            </p>
          </div>
        </div>

        {/* Section de contenu avec logo et texte */}
        <div className="content-section">
          <div className="content-grid">
            {/* Logo dans un cadre bleu */}
            <div className="logo-frame-container">
              <div className="logo-frame">
                <img
                  src="/logo.png"
                  alt="Golden Madina Logo"
                  className="framed-logo"
                />
              </div>
            </div>

            {/* Texte explicatif */}
            <div className="text-content">
              <p className="content-paragraph">
adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consequat. consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consequat. consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
