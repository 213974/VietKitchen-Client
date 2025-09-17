import React, { useState } from 'react';
import apiClient from '../../../services/apiClient';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import { isAxiosError } from 'axios';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        // Redirect to the new admin dashboard
        navigate('/admin/dashboard'); 
      }

    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Login failed.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading}/>
        </div>
        <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;