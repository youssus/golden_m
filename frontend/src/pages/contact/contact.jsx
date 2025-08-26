// contact.jsx - Page de contact avec formulaire
import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/navbar/navbar.jsx';
import './contact.css';
import Footer from '../../components/Footer/footer.jsx';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const serverUrl =
    'http://localhost:3000';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // small client-side validation
    if (!formData.email || !formData.message) {
      setErrorMsg('Email and message are required.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await axios.post(`${serverUrl}/api/contact/send`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      // success
      setStatus('success');
      alert('Message envoyé avec succès !'); // keeps behavior you had
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        message: ''
      });
    } catch (err) {
      console.error('Erreur envoi contact:', err);
      setStatus('error');
      setErrorMsg(
        err.response?.data?.message ||
        err.message ||
        'Erreur lors de l\'envoi. Réessayez plus tard.'
      );
      // keep the form so user can retry
    }
  };

  return (
    <Layout className="contact-page-layout" allowScroll={true}>
      <div className="contact-page">
        <Navbar />
        <div className="contact-content">
          <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nom" className="form-label">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prenom" className="form-label">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Envoi...' : 'Submit'}
              </button>

              {/* status messages (non-intrusive, keeps layout) */}
              {status === 'success' && (
                <p style={{ color: 'green', marginTop: 12 }}>Message envoyé.</p>
              )}
              {status === 'error' && errorMsg && (
                <p style={{ color: 'crimson', marginTop: 12 }}>{errorMsg}</p>
              )}
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Contact;
