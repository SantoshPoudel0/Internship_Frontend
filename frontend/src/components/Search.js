import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Search.css';

// Sample search data - in a real application this would come from a database or API
const searchData = [
  { title: 'Home', path: '/', content: 'From Crop To Cup. Himalayan Java Coffee Beans are grown locally and are roasted to perfection.' },
  { title: 'About', path: '/#outlets', content: 'Learn about Himalayan Java, our history and our outlets across Nepal.' },
  { title: 'Services', path: '/#services', content: 'We offer high-quality coffee, comfortable ambiance, and exceptional service.' },
  { title: 'Menu', path: '/#menu', content: 'Espresso, Cappuccino, Latte, Americano, Macchiato, Mocha and more.' },
  { title: 'Training', path: '/trainings', content: 'Barista basics, latte art, coffee tasting, brewing methods, coffee roasting, cafe management.' },
  { title: 'Contact', path: '/#contact', content: 'Tridevi Marg, Thamel, Kathmandu, Nepal. info@himalayanjava.com' }
];

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Focus on search input when component mounts
  useEffect(() => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }, []);
  
  // Handle search input change
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
    );
    
    setResults(filteredResults);
  };
  
  // Navigate to selected result
  const handleResultClick = (path) => {
    navigate(path);
  };
  
  // Handle close search
  const handleClose = () => {
    // Navigate back to previous page or home
    if (location.key === 'default') {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="search-container">
      <div className="search-overlay">
        <div className="search-box">
          <div className="search-header">
            <h2>Search</h2>
            <button className="close-button" onClick={handleClose}>✕</button>
          </div>
          
          <div className="search-input-container">
            <input 
              id="search-input"
              type="text" 
              placeholder="Search for something..." 
              value={query} 
              onChange={handleSearchChange}
              autoFocus
            />
            <span className="search-icon">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                <path d="M21 21L16 16" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          
          <div className="search-results">
            {results.length === 0 && query.length > 1 ? (
              <p className="no-results">No results found for "{query}"</p>
            ) : (
              results.map((result, index) => (
                <div 
                  key={index} 
                  className="search-result-item" 
                  onClick={() => handleResultClick(result.path)}
                >
                  <h3>{result.title}</h3>
                  <p>{result.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search; 