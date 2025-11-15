'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { isAxiosError } from 'axios';
import apiClient from '@/services/apiClient';
import SEO from '@/components/common/SEO/SEO';

// --- Styles ---
import '@/pages/Contact/ContactPage.css';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ message: '', type: '' });

    try {
      const response = await apiClient.post('/contact', { name, email, subject, message });
      setStatus({ message: response.data.message || 'Thank you! Your message has been sent.', type: 'success' });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setStatus({ message: err.response.data.message || 'An error occurred.', type: 'error' });
      } else {
        setStatus({ message: 'An unexpected error occurred. Please try again.', type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Viet Kitchen & Tea House. Send us a message, find our address, or view our location on the map. We'd love to hear from you."
      />
      <motion.div
        className="contact-page-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="contact-header">
          <h1>We’d Love to Hear From You!</h1>
          <p>Whether you have a question, feedback, or just want to say hello, feel free to reach out.</p>
        </div>

        <div className="contact-content-wrapper">
          <div className="contact-form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              {status.message && <p className={`form-status-message ${status.type}`}>{status.message}</p>}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name (Required)</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email (Required)</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject (Optional)</label>
                <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} disabled={isLoading} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={8} value={message} onChange={(e) => setMessage(e.target.value)} required disabled={isLoading}></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          <div className="contact-info-section">
            <div className="info-box">
              <h3>Our Location</h3>
              <p>20789 Great Falls Plaza #174<br />Sterling, VA 20165</p>
              <h3>Contact Info</h3>
              <p>(571) 918-0641<br/>vietkitchenteahouse@gmail.com</p>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6197.765086964437!2d-77.3582615!3d39.040797399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b6374a353794ed%3A0x6612703ed7dad25a!2s20789%20Great%20Falls%20Plaza%20%23174%2C%20Sterling%2C%20VA%2020165!5e0!3m2!1sen!2sus!4v1758198480924!5m2!1sen!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps location of Viet Kitchen & Tea House"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};