import React from 'react';
import './Services.css';

function Services() {
  // Hardcoded services data that matches server data structure
  const services = [
    {
      _id: "1",
      title: "Nepali Coffee Beans",
      description: "Himalayan Java offers its customers with locally brewed taste.",
      icon: "/coffee-bag 1.svg"
    },
    {
      _id: "2",
      title: "Barista Training",
      description: "Himalayan Java Barista Coffee School was introduced to promote the culture of vocational training in Nepal.",
      icon: "/barista 1.svg"
    },
    {
      _id: "3",
      title: "Bakery Equipments",
      description: "Himalayan Java is the sole distributor of various coffee equipment and products in Nepal.",
      icon: "/openmoji_drip-coffee-maker (1).svg"
    },
    {
      _id: "4",
      title: "Fresh Bakery Items",
      description: "We provide you a wide variety of fresh bakery items.",
      icon: "/freshbakeryitem.svg"
    }
  ];
  
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
          {services.map(service => (
            <div className="service-card" key={service._id}>
              <div className="service-content">
                <div className="service-icon" style={getIconStyle(service.title)}>
                  <img 
                    src={service.icon} 
                    alt={service.title} 
                  />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-text">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services; 