import React from 'react';
import './Suggestions.css';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const suggestionsData = [
  {
    img: '/femme_1_blog.png',
    title: 'Suggestion 1',
    text: 'consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. consectetur adipiscing elit, sed diam',
    page: 'blog1',
  },
  {
    img: '/femme_2_blog.png',
    title: 'Suggestion 2',
    text: 'consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. consectetur adipiscing elit, sed diam',
    page: 'blog2',
  },
  {
    img: '/femme_3_blog.png',
    title: 'Suggestion 3',
    text: 'consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. consectetur adipiscing elit, sed diam',
    page: 'blog3',
  },
  {
    img: '/femme_4_blog.png',
    title: 'Suggestion 4',
    text: 'consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. consectetur adipiscing elit, sed diam',
    page: 'blog4',
  },
  {
    img: '/femme_5_blog.png',
    title: 'Suggestion 5',
    text: 'consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. consectetur adipiscing elit, sed diam',
    page: 'blog5',
  },
  {
    img: '/femme_6_blog.png',
    title: 'Suggestion 6',
    text: 'consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. consectetur adipiscing elit, sed diam',
    page: 'blog6',
  },
];

const Suggestions = ({ currentPage = 'blog1' }) => {
  const swiperRef = useRef(null);
  // Filtrer les suggestions pour exclure la page courante
  const filteredSuggestions = suggestionsData.filter(card => card.page !== currentPage);

  return (
    <section className="suggestions-section">
      <div className="suggestions-top-bar"></div>
      <h2 className="suggestions-title">SUGGESTIONS</h2>
      <div className="custom-swiper-wrapper">
        <button className="custom-swiper-arrow left" onClick={() => swiperRef.current?.slidePrev()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke="#B0B0B0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <Swiper
          spaceBetween={32}
          slidesPerView={3}
          onSwiper={swiper => (swiperRef.current = swiper)}
          style={{ paddingBottom: '32px' }}
        >
          {filteredSuggestions.map((card, idx) => (
            <SwiperSlide key={idx}>
              <div className="suggestion-card">
                <img src={card.img} alt={card.title} className="suggestion-image" />
                <div className="suggestion-content">
                  <h3 className="suggestion-card-title">{card.title}</h3>
                  <p className="suggestion-card-text">{card.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="custom-swiper-arrow right" onClick={() => swiperRef.current?.slideNext()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="#B0B0B0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
);

}
export default Suggestions;
