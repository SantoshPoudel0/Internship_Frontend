import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Training.css';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';

function Training() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
  
  // Fallback data in case API fails
  const fallbackTrainings = [
    {
      _id: "1",
      title: 'MERN Stack Training in Nepal',
      duration: '3 months',
      description: 'Learn MongoDB, Express.js, React.js, and Node.js stack from experienced developers.',
      level: 'Intermediate'
    },
    {
      _id: "2",
      title: 'Python with Django Training in Nepal',
      duration: '2.5 months',
      description: 'Master Python programming and Django web framework to build robust web applications.',
      level: 'Beginner'
    },
    {
      _id: "3",
      title: 'Digital Marketing Training in Nepal',
      duration: '2.5 months',
      description: 'Learn SEO, social media marketing, content marketing, and online advertising strategies.',
      level: 'All Levels'
    },
    {
      _id: "4",
      title: 'Quality Assurance Training in Nepal',
      duration: '2.5 months',
      description: 'Learn software testing methodologies, automation tools, and quality assurance best practices.',
      level: 'Intermediate'
    }
  ];

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/trainings`);
        setTrainings(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trainings:', err);
        // Use fallback data if API fails
        setTrainings(fallbackTrainings);
        setLoading(false);
      }
    };
    
    fetchTrainings();
  }, []);

  // Function to get placeholder image based on training title
  const getPlaceholderImage = (title, imageUrl) => {
    if (imageUrl && imageUrl !== 'default-training.jpg') {
      return `${API_URL}/uploads/${imageUrl}`;
    }
    
    if (title.includes('MERN')) {
      return 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png';
    } else if (title.includes('Python')) {
      return 'https://cdn.iconscout.com/icon/free/png-256/free-python-3521655-2945099.png';
    } else if (title.includes('Digital Marketing')) {
      return 'https://cdn.iconscout.com/icon/free/png-256/free-marketing-1855075-1574623.png';
    } else if (title.includes('Quality Assurance')) {
      return 'https://cdn.iconscout.com/icon/free/png-256/free-qa-1-283367.png';
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
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="modern-training-grid">
            {trainings.map(training => (
              <Link 
                key={training._id} 
                to={`/trainings/${training._id}`}
                className="card-link"
              >
                <div className="modern-training-card" style={{ backgroundColor: '#FFFFFF' }}>
                  <div className="training-logo-container">
                    <img 
                      src={getPlaceholderImage(training.title, training.imageUrl)} 
                      alt={`${training.title} logo`} 
                      className="training-logo" 
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