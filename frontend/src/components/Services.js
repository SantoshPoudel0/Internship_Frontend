import React, { useState, useEffect } from 'react';
import './Services.css';
import axios from 'axios';
import { API_URL } from '../utils/constants';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Hard-coded services as fallback in case API fails
  const fallbackServices = [
    {
      _id: "1",
      title: "Nepali Coffee Beans",
      description: "Himalayan Java offers its customers with locally brewed taste.",
      icon: "default-icon.png"
    },
    {
      _id: "2",
      title: "Barista Training",
      description: "Himalayan Java Barista Coffee School was introduced to promote the culture of vocational training in Nepal.",
      icon: "default-icon.png"
    },
    {
      _id: "3",
      title: "Bakery Equipments",
      description: "Himalayan Java is the sole distributor of various coffee equipment and products in Nepal.",
      icon: "default-icon.png"
    },
    {
      _id: "4",
      title: "Fresh Bakery Items",
      description: "We provide you a wide variety of fresh bakery items.",
      icon: "default-icon.png"
    }
  ];
  
  // Map service titles to their corresponding icon files
  const iconMap = {
    'Nepali Coffee Beans': '/coffee-bag 1.svg',
    'Barista Training': '/barista 1.svg',
    'Bakery Equipments': '/openmoji_drip-coffee-maker (1).svg',
    'Fresh Bakery Items': '/freshbakeryitem.svg'
  };
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/services`);
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        // Use fallback services if API fails
        setServices(fallbackServices);
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  // Get the appropriate icon for a service
  const getServiceIcon = (service) => {
    if (service.icon !== 'default-icon.png') {
      return `${API_URL}/uploads/${service.icon}`;
    }
    
    // Use the mapped icon if available, or fallback to a default
    return iconMap[service.title] || '/coffee-bag 1.svg';
  };
  
  // Get appropriate icon style based on service title
  const getIconStyle = (title) => {
    if (title === 'Bakery Equipments') {
      return { marginTop: '-45px' };
    }
    return {};
  };

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
          {loading ? (
            <div className="loading-message">Loading services...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : services.length === 0 ? (
            <div className="no-services-message">No services found</div>
          ) : (
            services.map(service => (
              <div className="service-card" key={service._id}>
                <div className="service-content">
                  <div className="service-icon" style={getIconStyle(service.title)}>
                    <img 
                      src={getServiceIcon(service)} 
                      alt={service.title} 
                    />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-text">{service.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Services; 