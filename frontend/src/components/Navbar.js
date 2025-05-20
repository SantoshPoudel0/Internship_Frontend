import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  
  const handleServicesClick = (e) => {
    e.preventDefault();
    
    // Check if we're already on the home page
    if (window.location.pathname === '/') {
      // If on home page, just scroll to the services section smoothly
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home page with services hash
      navigate('/#services');
    }
  };
  
  const handleAboutClick = (e) => {
    e.preventDefault();
    
    // Check if we're already on the home page
    if (window.location.pathname === '/') {
      // If on home page, just scroll to the outlets section smoothly
      const outletsSection = document.getElementById('outlets');
      if (outletsSection) {
        outletsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home page with outlets hash
      navigate('/#outlets');
    }
  };
  
  const handleTrainingsClick = () => {
    console.log('Trainings link clicked, navigating to /trainings');
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <a href="#outlets" className="nav-link" onClick={handleAboutClick}>
            About
          </a>
          <a href="#services" className="nav-link" onClick={handleServicesClick}>
            Services
          </a>
        </div>
        
        <Link to="/" className="navbar-logo">
          <img src="/coffeeHouse.svg" alt="Coffeehouse" />
        </Link>
        
        <div className="nav-right">
          <Link to="/trainings" className="nav-link" onClick={handleTrainingsClick}>
            Trainings
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
          <Link to="/search" className="search-icon">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M21 21L16 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 