import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Training.css';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';

function Training() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUsingFallback, setIsUsingFallback] = useState(true);
  
  // Track which training is expanded
  const [expandedTrainingId, setExpandedTrainingId] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Comprehensive fallback data that matches what would come from the server
  const fallbackTrainings = [
    {
      _id: "1",
      title: 'Barista Training Course',
      duration: '3 months',
      description: 'Learn the art of coffee preparation from bean selection to perfect brewing techniques.',
      level: 'Beginner',
      price: 250,
      discount: 0,
      format: 'Physical Class',
      imageUrl: null
    },
    {
      _id: "2",
      title: 'Coffee Making Training',
      duration: '5 months',
      description: 'Master the art of coffee preparation and brewing techniques.',
      level: 'Beginner',
      price: 22000,
      discount: 2000,
      format: 'Physical/Online Class',
      imageUrl: null
    },
    {
      _id: "3",
      title: 'Espresso & Latte Art Training',
      duration: '2.5 months',
      description: 'Learn to create beautiful latte art and perfect espresso shots.',
      level: 'Intermediate',
      price: 18000,
      discount: 0,
      format: 'Physical Class',
      imageUrl: null
    },
    {
      _id: "4",
      title: 'Professional Coffee Brewing Course',
      duration: '2.5 months',
      description: 'Advanced coffee brewing techniques for professional baristas.',
      level: 'Advanced',
      price: 20000,
      discount: 1500,
      format: 'Physical/Online Class',
      imageUrl: null
    }
  ];

  useEffect(() => {
    // Always initialize with fallback trainings
    setTrainings(fallbackTrainings);
    setIsUsingFallback(true);
    
    const fetchTrainings = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/trainings`);
        
        if (response.data && response.data.length > 0) {
          console.log("Server trainings:", response.data);
          setTrainings(response.data);
          setIsUsingFallback(false);
        }
      } catch (err) {
        console.error('Error fetching trainings:', err);
        // Fallback trainings are already set, no need to do anything here
      }
    };
    
    fetchTrainings();
  }, []);

  // Function to get image for a training
  const getTrainingImage = (training) => {
    // Check if we have an actual image URL from the server
    if (!isUsingFallback && training.imageUrl) {
      return `${API_URL}/uploads/${training.imageUrl}`;
    }
    
    // If no image is available, use a default based on title
    if (training.title.includes('Barista')) {
      return 'https://cdn.iconscout.com/icon/free/png-256/free-coffee-beans-1851033-1569306.png';
    } else if (training.title.includes('Coffee Making')) {
      return 'https://cdn.iconscout.com/icon/free/png-256/free-coffee-1817161-1537924.png';
    } else if (training.title.includes('Espresso')) {
      return 'https://cdn.iconscout.com/icon/free/png-256/free-espresso-1817173-1537936.png';
    } else if (training.title.includes('Brewing')) {
      return 'https://cdn.iconscout.com/icon/free/png-256/free-coffee-machine-1817149-1537912.png';
    }
    
    return 'https://placehold.co/200x100?text=Training';
  };
  
  // Handle toggling the expanded training
  const toggleTrainingDetails = (trainingId) => {
    if (expandedTrainingId === trainingId) {
      setExpandedTrainingId(null); // Collapse if already expanded
    } else {
      setExpandedTrainingId(trainingId); // Expand this training
      // Reset form state when opening a new training detail
      setFormSuccess(false);
      setFormError(null);
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }
  };
  
  // Handle booking form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle booking form submission
  const handleSubmitBooking = async (e, trainingId, trainingTitle) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);
    
    try {
      // Submit booking to the backend
      await axios.post(`${API_URL}/api/bookings`, {
        ...bookingForm,
        trainingId: trainingId,
        trainingTitle: trainingTitle
      });
      
      setFormSuccess(true);
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setFormError('Failed to submit booking. Please try again.');
      console.error('Booking submission error:', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Custom styles for larger images
  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '250px',
    marginBottom: '20px',
    padding: '10px'
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '220px',
    objectFit: 'contain'
  };

  return (
    <section id="training" className="training-section">
      <div className="training-container">
        <div className="training-header">
          <h1>Our Training Programs</h1>
          <p className="training-description">
            Enhance your skills with our professional training programs taught by industry experts.
            We offer hands-on experience and practical knowledge for various tech and business domains.
          </p>
        </div>
        
        {loading ? (
          <div className="loading-spinner">Loading trainings...</div>
        ) : (
          <div className="modern-training-grid">
            {trainings.map(training => (
              <Link 
                key={training._id} 
                to={`/trainings/${training._id}`}
                className="card-link"
              >
                <div className="modern-training-card" style={{ backgroundColor: '#FFFFFF', padding: '30px' }}>
                  <div style={imageContainerStyle}>
                    <img 
                      src={getTrainingImage(training)} 
                      alt={`${training.title} logo`} 
                      style={imageStyle}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/200x100?text=Training';
                      }}
                    />
                  </div>
                  
                  <div className="modern-training-content">
                    <h3 className="modern-training-title">{training.title}</h3>
                    <p className="modern-training-duration">{training.duration}</p>
                    
                    <div className="learn-more-button">
                      Learn More <span className="arrow">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        

      </div>
    </section>
  );
}

export default Training; 