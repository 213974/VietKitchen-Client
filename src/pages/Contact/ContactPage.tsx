import { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css';
import apiClient from '../../services/apiClient';
import { isAxiosError } from 'axios';

const ContactPage = () => {
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
      // Clear form on success
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
    </motion.div>
  );
};

export default ContactPage;