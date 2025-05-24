import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Button, Form, Row, Col, Alert, Spinner, Container } from 'react-bootstrap';
import './TrainingDetails.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Comprehensive fallback data that matches what would come from the server
const fallbackTrainingsData = [
  {
    _id: "1",
    title: 'Barista Training Course',
    duration: '3 months',
    description: 'Learn the art of coffee preparation from bean selection to perfect brewing techniques. This hands-on training program will teach you everything you need to know to become a professional barista.',
    level: 'Beginner',
    price: 250,
    discount: 0,
    format: 'Physical Class',
    careerProspect: 'Professional Barista',
    imageUrl: null,
    learningTopics: [
      'Coffee bean selection and quality assessment',
      'Proper grinding techniques and equipment maintenance',
      'Advanced extraction methods and brewing variables',
      'Milk steaming and latte art techniques',
      'Coffee flavor profiles and sensory evaluation',
      'Barista competition preparation and skills'
    ]
  },
  {
    _id: "2",
    title: 'Coffee Making Training',
    duration: '5 months',
    description: 'Master the art of coffee preparation and brewing techniques. This comprehensive training covers everything from bean selection to advanced brewing methods.',
    level: 'Beginner',
    price: 22000,
    discount: 2000,
    format: 'Physical/Online Class',
    careerProspect: 'Coffee Professional',
    imageUrl: null,
    learningTopics: [
      'Coffee origins and varieties',
      'Brewing methods and equipment',
      'Flavor profiles and tasting techniques',
      'Customer service and cafe operations',
      'Coffee shop management basics',
      'Sustainable coffee practices'
    ]
  },
  {
    _id: "3",
    title: 'Espresso & Latte Art Training',
    duration: '2.5 months',
    description: 'Learn to create beautiful latte art and perfect espresso shots. This specialized training focuses on the artistic and technical aspects of espresso-based beverages.',
    level: 'Intermediate',
    price: 18000,
    discount: 0,
    format: 'Physical Class',
    careerProspect: 'Specialty Barista',
    imageUrl: null,
    learningTopics: [
      'Espresso extraction principles',
      'Milk texturing and microfoam techniques',
      'Basic to advanced latte art patterns',
      'Signature drink creation',
      'Espresso machine maintenance',
      'Competition-level techniques'
    ]
  },
  {
    _id: "4",
    title: 'Professional Coffee Brewing Course',
    duration: '2.5 months',
    description: 'Advanced coffee brewing techniques for professional baristas. This course is designed for those looking to take their coffee skills to the next level.',
    level: 'Advanced',
    price: 20000,
    discount: 1500,
    format: 'Physical/Online Class',
    careerProspect: 'Master Barista',
    imageUrl: null,
    learningTopics: [
      'Advanced brewing methodologies',
      'Coffee roasting principles',
      'Sensory evaluation and cupping',
      'Water chemistry and its impact on coffee',
      'Advanced equipment techniques',
      'Coffee competition preparation'
    ]
  }
];

function TrainingDetails() {
  const { id } = useParams();
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    // Find the matching training from fallback data
    const fallbackTraining = fallbackTrainingsData.find(t => t._id === id);
    
    // Set fallback training immediately
    if (fallbackTraining) {
      setTraining(fallbackTraining);
      setIsUsingFallback(true);
    }
    
    const fetchTraining = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/trainings/${id}`);
        
        if (response.data) {
          console.log("Server training details:", response.data);
          setTraining(response.data);
          setIsUsingFallback(false);
        }
      } catch (err) {
        console.error('Error fetching training details:', err);
        // Fallback training is already set, no need to do anything here
      } finally {
        setLoading(false);
      }
    };
    
    fetchTraining();
  }, [id]);

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

  // Custom styles for larger images
  const imageContainerStyle = {
    width: '450px',
    height: '450px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#f8f9fa',
    border: '5px solid #fff',
    marginLeft: '40px',
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  };

  // Function to get instructor image
  const getInstructorImage = (instructor) => {
    if (!isUsingFallback && instructor?.imageUrl && instructor.imageUrl !== 'default-instructor.jpg') {
      return `${API_URL}/uploads/${instructor.imageUrl}`;
    }
    return "https://placehold.co/100x100?text=Instructor";
  };

  // Handle booking form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    // Validate phone field to allow numbers and special characters for phone numbers
    if (name === 'phone') {
      // Allow international format with +, spaces, parentheses, and dashes
      if (value === '' || /^[+]?[\s./0-9()-]*$/.test(value)) {
        setBookingForm(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setBookingForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle booking form submission
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);
    
    if (isUsingFallback) {
      // Show a different message when using fallback data
      toast.info('Booking feature is available when the server is online. Your form data would be sent when connected.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      setFormSubmitting(false);
      return;
    }
    
    try {
      // Submit booking to the backend
      await axios.post(`${API_URL}/api/bookings`, {
        ...bookingForm,
        trainingId: training._id,
        trainingTitle: training.title
      });
      
      // Show success toast notification
      toast.success('🎉 Booking Submitted Successfully! We will contact you shortly.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      toast.error('Failed to submit booking. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Booking submission error:', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  if (!training) {
    return (
      <Container className="error-container">
        <Alert variant="danger">
          Training not found
          <div className="mt-3">
            <Link to="/trainings" className="btn btn-outline-primary">Back to Trainings</Link>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="new-training-details-page">
      <div className="new-training-back-btn">
        <Link to="/trainings" className="new-back-link">
          Back
        </Link>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="new-training-container">
        <h1 className="new-training-title">{training.title}</h1>
        
        <div className="new-training-content">
          <div className="new-training-description">
            <p>{training.description}</p>
          </div>
          
          <div style={imageContainerStyle}>
            <img 
              src={getTrainingImage(training)} 
              alt={training.title}
              style={imageStyle}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/200x100?text=Training';
              }}
            />
          </div>
        </div>
        
        <table className="new-training-details-table">
          <tbody>
            <tr>
              <th>Training Level</th>
              <td>{training.level || 'All Levels'}</td>
              <th>Format</th>
              <td>{training.format || 'Physical/Online Class'}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{training.duration}</td>
              <th>Price</th>
              <td>
                {training.discount > 0 ? (
                  <>
                    <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>
                      Rs. {training.price}
                    </span>
                    <span style={{ color: '#4A2C2A', fontWeight: 'bold' }}>
                      Rs. {training.price - training.discount}
                    </span>
                  </>
                ) : (
                  `Rs. ${training.price}`
                )}
              </td>
            </tr>
            <tr>
              <th>Career Prospect</th>
              <td colSpan="3">{training.careerProspect || (training.title.toLowerCase().includes('barista') || training.title.toLowerCase().includes('coffee') ? 'Barista/Coffee Professional' : 'Industry Professional')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Content sections */}
      <Container className="mt-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="content-box training-highlights">
              <h2>What You'll Learn</h2>
              <ul className="highlights-list">
                {training.learningTopics && training.learningTopics.length > 0 ? (
                  training.learningTopics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))
                ) : (
                  <>
                    {training.title.toLowerCase().includes('barista') || training.title.toLowerCase().includes('coffee') ? (
                      <>
                        <li>Coffee bean selection and quality assessment</li>
                        <li>Proper grinding techniques and equipment maintenance</li>
                        <li>Advanced extraction methods and brewing variables</li>
                        <li>Milk steaming and latte art techniques</li>
                        <li>Coffee flavor profiles and sensory evaluation</li>
                        <li>Barista competition preparation and skills</li>
                      </>
                    ) : (
                      <>
                        <li>Fundamental concepts and industry best practices</li>
                        <li>Hands-on projects and practical applications</li>
                        <li>Problem-solving and critical thinking skills</li>
                        <li>Industry-standard tools and technologies</li>
                        <li>Career development and professional networking</li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>
            
            <div className="content-box instructor-section">
              <h2>Meet Your Instructor</h2>
              <div className="instructor-profile">
                <div className="instructor-avatar">
                  <img 
                    src={getInstructorImage(training.instructor)}
                    alt={training.instructor?.name || "Instructor"} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/100x100?text=Instructor';
                    }}
                  />
                </div>
                <div className="instructor-info">
                  {training.instructor && training.instructor.name ? (
                    <>
                      <h3>{training.instructor.name}</h3>
                      <p className="instructor-title">{training.instructor.title || 'Coffee Training Instructor'}</p>
                      <p className="instructor-bio">{training.instructor.bio || 'An experienced trainer passionate about helping students achieve their coffee skills and goals.'}</p>
                    </>
                  ) : (
                    <>
                      <h3>{training.title.toLowerCase().includes('barista') ? 'Coffee Master' : 'Expert Trainer'}</h3>
                      <p className="instructor-title">Professional {training.title.toLowerCase().includes('barista') ? 'Barista Trainer' : 'Coffee Training Expert'}</p>
                      <p className="instructor-bio">An experienced trainer with extensive experience in coffee industry. Passionate about mentoring new talent and helping students achieve their coffee career goals.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="content-box booking-form">
              <h2>Book This Training</h2>
              <Form onSubmit={handleSubmitBooking}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Your full name"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleFormChange}
                    required
                    placeholder="Your email address"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleFormChange}
                    required
                    placeholder="Your phone number"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Message (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={bookingForm.message}
                    onChange={handleFormChange}
                    rows={3}
                    placeholder="Any questions or special requests"
                  />
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 booking-submit-btn"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? 'Submitting...' : 'Book Now'}
                </Button>
              </Form>
            </div>

            <div className="content-box contact-box">
              <h3>Need More Information?</h3>
              <p>Contact us directly for any questions about this coffee training program.</p>
              <div className="contact-info">
                <p><strong>Phone:</strong> +977-1-4123456</p>
                <p><strong>Email:</strong> training@coffeetraining.com</p>
                <p><strong>Location:</strong> Thamel, Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TrainingDetails; 