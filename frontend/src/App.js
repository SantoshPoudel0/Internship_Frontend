import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Training from './components/Training';
import Contact from './components/Contact';
import './App.css';

// This component handles scrolling to sections when the URL has a hash
function ScrollToSection() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Add a slight delay to ensure DOM is fully loaded
      setTimeout(() => {
        // Get the element by ID (removing the # from the hash)
        const elementId = location.hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          // Scroll to the element smoothly
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (location.pathname === '/services') {
      // If we're on the /services route, navigate to home with services hash
      navigate('/#services', { replace: true });
    }
    // Removed the contact redirect since we now have a dedicated Contact page
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

function AppContent() {
  // No longer need preloading since we're using optimized external images
  return (
    <>
      <Navbar />
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServiceRedirect />} />
        <Route path="/trainings" element={<Trainings />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

// Improved service redirect component
function ServiceRedirect() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Use navigate instead of direct window.location for better SPA behavior
    navigate('/#services', { replace: true });
  }, [navigate]);
  
  return null;
}

// Placeholder components
function About() {
  return <h1>About Page</h1>;
}

function Trainings() {
  return (
    <div className="training-page-container">
      <Training />
    </div>
  );
}

export default App;
