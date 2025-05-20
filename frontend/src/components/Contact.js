import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitStatus(null), 3000);
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

            <button type="submit" className="submit-button">Send Message</button>
            
            {submitStatus === 'success' && (
              <div className="success-message">
                Message sent!
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