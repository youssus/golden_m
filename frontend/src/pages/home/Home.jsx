  import React from 'react';
import './Home.css';
import Layout from '../../components/Layout/Layout';
import Header from '../../components/header Home/Header-Home';
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Home() {
  return (
    <Layout className="home-page" allowScroll={false}>
      <Header />
      <div className="container">
        {/* Sidebar with social icons */}
        <div className="sidebar">
          <div className="social-icon">
            <a href="https://www.facebook.com/profile.php?id=100095124842711" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          </div>
          
          <div className="social-icon">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
          
          <div className="social-icon">
            <a href="https://www.instagram.com/goldenmadina_7/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
          
          <div className="social-icon">
            <a href="https://www.linkedin.com/company/goldenmadina/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>

      {/* Main content area */}
      <div className="main-content">
        {/* Left content section */}
        <div className="content-section">
          <div className="content-wrapper">
            <h1 className="title">Golden Madina</h1>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam 
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam 
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci 
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo 
              consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate 
              velit esse molestie consequat, vel illum dolore eu feugiat nulla facili-
              sis at vero eros et accumsan et iusto odio dignissim qui blandit 
              praesent luptatum zzril delenit augue dullsi.
            </p>

            <div className="learn-more">
              <a href="https://sketchfab.com/Goldenmadina" target="_blank" rel="noopener noreferrer">
                <span>Learn more</span>
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right image section */}
        <div className="image-section">
          <div className="blue-rectangle"></div>
          <img
            src="/sculpture0.png"
            alt="Classical Greek statue"
            className="statue-image"
          />
        </div>
        </div>
      </div>
    </Layout>
  );
}