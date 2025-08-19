// media.jsx - Avec grille complète de logos médias
import React from 'react';
import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/navbar/navbar.jsx';
import './media.css';
import Footer from '../../components/Footer/footer.jsx';

const MonComposant = () => {
  const mediaLogos = [
    // Ligne 1
    { src: 'ifm.png', alt: 'ifm' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    
    // Ligne 2
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    
    // Ligne 3
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    
    // Ligne 4
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' }, // Logo ajouté pour compléter à 40
    
    // Ligne 5
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    
    // Ligne 6
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' },
    { src: '/logo.svg', alt: 'Logo' }, // Complète la ligne 6 avec 6 logos
    
    // Ligne 7 - Les 4 derniers logos qui seront centrés
    { src: '/logo.svg', alt: 'Logo' }, // Logo 37
    { src: '/logo.svg', alt: 'Logo' }, // Logo 38
    { src: '/logo.svg', alt: 'Logo' }, // Logo 39
    { src: '/logo.svg', alt: 'Logo' }  // Logo 40
  ];

  return (
    <Layout className="media-page-layout" allowScroll={true}>
      <div className="media-page">
        <Navbar />
        <div className="page-content">
          <div className="hero-image"></div>

          {/* Grille de logos médias */}
          <div className="media-logos-container">
            <div className="media-logos-grid">
              {mediaLogos.map((logo, index) => (
                <div key={index} className="media-logo-card">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="logo-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default MonComposant;