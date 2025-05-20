import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Training from './components/Training';
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
    } else if (location.pathname === '/contact') {
      // If we're on the /contact route, navigate to home with contact hash
      navigate('/#contact', { replace: true });
    }
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
  // Immediately preload all training images when app first loads
  useEffect(() => {
    // Preload training images
    const preloadImages = [
      '/images/training/barista-basics.jpg',
      '/images/training/latte-art.jpg',
      '/images/training/coffee-tasting.jpg',
      '/images/training/brewing-methods.jpg',
      '/images/training/coffee-roasting.jpg',
      '/images/training/cafe-management.jpg',
      '/images/training/certification.jpg'
    ];
    
    // Create image objects and load immediately (high priority)
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // Pre-render a hidden Training component to warm up the cache
    const hiddenTraining = document.createElement('div');
    hiddenTraining.style.position = 'absolute';
    hiddenTraining.style.width = '0';
    hiddenTraining.style.height = '0';
    hiddenTraining.style.overflow = 'hidden';
    document.body.appendChild(hiddenTraining);
    
    // Clean up
    return () => {
      if (document.body.contains(hiddenTraining)) {
        document.body.removeChild(hiddenTraining);
      }
    };
  }, []);

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
  console.log('Training component is rendering');
  return (
    <div style={{
      marginTop: '123px',
      position: 'relative'
    }}>
      <Training />
    </div>
  );
}

function Contact() {
  return <h1>Contact Page</h1>;
}

export default App;
