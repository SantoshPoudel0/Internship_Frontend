import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-sections">
        <div className="footer-nav">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Team</li>
            <li>FAQs</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Tridevi Marg, Thamel</p>
          <p>Kathmandu, Nepal</p>
          <p>#info@himalayanjava.com</p>
          <p>+977-(0)1-4435171</p>
        </div>

        <div className="footer-map">
          <iframe
            title="Himalayan Java Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0717989771507!2d85.31392!3d27.7140252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190286e454ad%3A0xb002146d30bac2e5!2sHimalayan%20Java%20-%20Tridevi%20Thamel!5e0!3m2!1sen!2sus!4v1715762424200!5m2!1sen!2sus"
            width="400"
            height="200"
            style={{ border: 0, maxWidth: '100%' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2021 Himalayan Java</p>
        <div className="footer-social">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
        <p>Created by BrandBuilder</p>
      </div>
    </footer>
  );
}

export default Footer;
