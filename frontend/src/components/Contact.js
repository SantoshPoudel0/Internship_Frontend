import React, { useState } from 'react';
import './Contact.css';
import { API_URL } from '../utils/constants';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Website Contact Form',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate phone field to allow numbers and special characters for phone numbers
    if (name === 'phone') {
      // Allow international format with +, spaces, parentheses, and dashes
      if (value === '' || /^[+]?[\s./0-9()-]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Ensure all required fields are filled
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError('Please fill in all required fields');
      setSubmitStatus('error');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Submitting form data:', formData);
      const response = await fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: 'Website Contact Form', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>
      
      <div className="contact-container">
        <div className="contact-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your phone number (e.g. +977 98XXXXXXXX)"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="^[+]?[\s./0-9()-]+$"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="success-message">
                Message sent! We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="error-message">
                {error}
              </div>
            )}
          </form>
        </div>
        
        <div className="contact-info-sidebar">
          <div className="contact-info-item">
            <h3>Address</h3>
            <p>Tridevi Marg, Thamel, Kathmandu</p>
          </div>
          
          <div className="contact-info-item">
            <h3>Phone & Email</h3>
            <p>+977-(0)1-4435171</p>
            <p>info@himalayanjava.com</p>
          </div>
          
          <div className="contact-info-item">
            <h3>Hours</h3>
            <p>Mon-Fri: 7am - 10pm</p>
            <p>Sat-Sun: 8am - 11pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 