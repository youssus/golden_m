import React, { useState } from 'react';
import './story2.css';
import { useTheme } from '../../../contexts/ThemeContext';

const images = [
  '/img1.jpg',
  '/img2.jpg',
  '/img3.jpeg',
];

const ImageCarousel = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirst = currentIndex === 0;
    setCurrentIndex(isFirst ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    const isLast = currentIndex === images.length - 1;
    setCurrentIndex(isLast ? 0 : currentIndex + 1);
  };

  return (
    <div className={`story2-page ${theme}`}>
      <div className="carousel">
        <button className="left-arrow" onClick={goToPrevious}>&#10094;</button>

        <img src={images[currentIndex]} alt="carousel" className="carousel-image" />

        <button className="right-arrow" onClick={goToNext}>&#10095;</button>
      </div>
    </div>
  );
};

export default ImageCarousel;
