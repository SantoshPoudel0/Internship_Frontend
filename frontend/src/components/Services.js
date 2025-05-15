import React from 'react';
import './Services.css';

function Services() {
  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="services-top">
          <h1>Our Services</h1>
          <div className="services-description">
            <p>
              Himalayan Java offers its customers the best-tasting
              coffee beverages in the country. We have achieved
              this by using high-quality ingredients and strictly
              following preparation guidelines.
            </p>
          </div>
          <a href="#contact" className="contact-btn">Contact Us</a>
        </div>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-content">
              <div className="service-icon">
                <img src="/coffee-bag 1.svg" alt="Nepali Coffee Beans" />
              </div>
              <h3 className="service-title">Nepali Coffee Beans</h3>
              <p className="service-text coffee-beans-text">Himalayan Java offers its customers with locally brewed taste.</p>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-content">
              <div className="service-icon">
                <img src="/barista 1.svg" alt="Barista Training" />
              </div>
              <h3 className="service-title">Barista Training</h3>
              <p className="service-text barista-text">Himalayan Java Barista Coffee School was introduced to promote the culture of vocational training in Nepal.</p>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-content">
              <div className="service-icon">
                <img src="/openmoji_drip-coffee-maker (1).svg" alt="Bakery Equipments" />
              </div>
              <h3 className="service-title">Bakery Equipments</h3>
              <p className="service-text equipment-text">Himalayan Java is the sole distributor of various coffee equipment and products in<br/>Nepal.</p>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-content">
              <div className="service-icon">
                <img src="freshbakeryitem.svg" alt="Fresh Bakery Items" />
              </div>
              <h3 className="service-title">Fresh Bakery Items</h3>
              <p className="service-text bakery-text">We provied you a wide variety of fresh bakery items.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services; 