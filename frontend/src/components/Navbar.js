import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/services" className="nav-link">
            Services
          </Link>
        </div>
        
        <Link to="/" className="navbar-logo">
          <img src="/coffeeHouse.svg" alt="Coffeehouse" />
        </Link>
        
        <div className="nav-right">
          <Link to="/trainings" className="nav-link">
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