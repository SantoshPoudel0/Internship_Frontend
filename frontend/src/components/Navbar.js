import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { preloadImages } from '../utils/preloadImages';

// Sample search data - in a real application this would come from a database or API
const searchData = [
  { title: 'Home', path: '/', content: 'From Crop To Cup. Himalayan Java Coffee Beans are grown locally.' },
  { title: 'About', path: '/#outlets', content: 'Learn about Himalayan Java, our history and our outlets across Nepal.' },
  { title: 'Services', path: '/#services', content: 'We offer high-quality coffee, comfortable ambiance.' },
  { title: 'Menu', path: '/#menu', content: 'Espresso, Cappuccino, Latte, Americano, Macchiato, Mocha and more.' },
  { title: 'Training', path: '/trainings', content: 'Barista basics, latte art, coffee tasting, brewing methods.' },
  { title: 'Contact', path: '/#contact', content: 'Tridevi Marg, Thamel, Kathmandu, Nepal.' }
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const searchIconRef = useRef(null);
  
  // Check if current page is training page
  const isTrainingPage = location.pathname === '/trainings';
  
  // Check if current page is contact page
  const isContactPage = location.pathname === '/contact';
  
  // Set the search icon stroke color based on current page
  const searchIconColor = isTrainingPage ? '#747474' : (isContactPage ? '#747474' : '#FFFFFF');
  
  // Handle clicks outside of search area
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search if the click is outside search area and search icon
      if (
        showSearch && 
        searchRef.current && 
        !searchRef.current.contains(event.target) && 
        searchIconRef.current && 
        !searchIconRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setQuery('');
        setResults([]);
      }
    };

    // Add event listener when search is open
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);
  
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
  
  const handleContactClick = (e) => {
    e.preventDefault();
    
    // Navigate to dedicated Contact page
    navigate('/contact');
  };
  
  const toggleSearch = (e) => {
    e.preventDefault();
    setShowSearch(!showSearch);
    if (!showSearch) {
      // Focus search input when search bar appears
      setTimeout(() => {
        const searchInput = document.getElementById('navbar-search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
    setQuery('');
    setResults([]);
  };
  
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);
    
    if (searchTerm.length < 2) {
      setResults([]);
      return;
    }
    
    // Filter search data based on query
    const filteredResults = searchData.filter(item => 
      item.title.toLowerCase().includes(searchTerm) || 
      item.content.toLowerCase().includes(searchTerm)
    ).slice(0, 4); // Limit to 4 results
    
    setResults(filteredResults);
  };
  
  const handleResultClick = (path) => {
    navigate(path);
    setShowSearch(false);
    setQuery('');
    setResults([]);
  };
  
  const handleSearchBlur = () => {
    // No longer needed as we're using the click outside handler
  };
  
  const handleTrainingsClick = () => {
    console.log('Trainings link clicked, navigating to /trainings');
  };
  
  // Use this simple style approach
  const contactLinkStyle = isTrainingPage || isContactPage ? { color: '#747474' } : {};
  const trainingsLinkStyle = isContactPage ? { color: '#747474' } : {};
  
  // Handle home link click
  const handleHomeClick = (e) => {
    // Preload the home page image when navigating to home
    preloadImages(['/cofee-image-homepage.svg', '/coffeeHouse.svg']);
  };
  
  return (
    <nav className={`navbar ${isTrainingPage ? 'training-page' : ''}`}>
      <div className="navbar-container">
        <div className="nav-left">
          <a href="#outlets" className="nav-link" onClick={handleAboutClick}>
            About
          </a>
          <a href="#services" className="nav-link" onClick={handleServicesClick}>
            Services
          </a>
        </div>
        
        <Link to="/" className="navbar-logo" onClick={handleHomeClick}>
          <img src="/coffeeHouse.svg" alt="Coffeehouse" />
        </Link>
        
        <div className="nav-right">
          <Link to="/trainings" className="nav-link" onClick={handleTrainingsClick} style={trainingsLinkStyle}>
            Trainings
          </Link>
          <Link to="/contact" className="nav-link" onClick={handleContactClick} style={contactLinkStyle}>
            Contact
          </Link>
          <div className="navbar-search-container">
            <a href="#" className="search-icon" onClick={toggleSearch} ref={searchIconRef}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke={searchIconColor} strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M21 21L16 16" stroke={searchIconColor} strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {showSearch && (
        <div className={`navbar-search-overlay ${isTrainingPage ? 'training-search' : ''}`} ref={searchRef}>
          <div className={`navbar-search-wrapper ${isTrainingPage ? 'training-search' : ''}`}>
            <input
              id="navbar-search-input"
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleSearchChange}
              className={isTrainingPage ? 'training-search-input' : ''}
            />
            <button className={`navbar-search-close ${isTrainingPage ? 'training-close' : ''}`} onClick={toggleSearch}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke={isTrainingPage ? "#747474" : "#FFFFFF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke={isTrainingPage ? "#747474" : "#FFFFFF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {results.length > 0 && (
              <div className={`navbar-search-results ${isTrainingPage ? 'training-results' : ''}`}>
                {results.map((result, index) => (
                  <div 
                    key={index} 
                    className="navbar-search-result"
                    onClick={() => handleResultClick(result.path)}
                  >
                    <h4>{result.title}</h4>
                    <p>{result.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 