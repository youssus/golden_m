// src/components/footer/Footer.jsx
import React from 'react'
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        {/* Logo et description en haut */}
        <div className="footer-col newsletter">
          <div className="footer-logo">
            <img src="/logo.svg" alt="Golden Madina Logo" className="logo" />
          </div>
          <p className="footer-desc">
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.
          </p>
        </div>
      </div>

      {/* Social icons en bas */}
      <div className="footer-bottom">
        <div className="social-icons">
        <a href="https://www.facebook.com/profile.php?id=100095124842711" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.youtube.com/@goldenmadina7" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          <a href="https://www.instagram.com/goldenmadina_7/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.linkedin.com/company/goldenmadina/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  )
}