import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Button, Form, Row, Col, Alert, Spinner, Container } from 'react-bootstrap';
import './TrainingDetails.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Placeholder image function
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
  } else if (title.toLowerCase().includes('coffee') || title.toLowerCase().includes('barista')) {
    return 'https://cdn.iconscout.com/icon/free/png-256/free-coffee-beans-1851033-1569306.png';
  }
  return 'https://placehold.co/200x100?text=Training';
};

function TrainingDetails() {
  const { id } = useParams();
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/trainings/${id}`);
        setTraining(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching training details:', err);
        setError('Failed to load training details');
        setLoading(false);
      }
    };
    
    fetchTraining();
  }, [id]);

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

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status" variant="warning">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="error-container">
        <Alert variant="danger">
          {error}
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

      {training && (
        <>
          <div className="new-training-container">
            <h1 className="new-training-title">{training.title}</h1>
            
            <div className="new-training-content">
              <div className="new-training-description">
                <p>{training.description}</p>
              </div>
              
              <div className="new-training-image-container">
                <img 
                  src={getPlaceholderImage(training.title, training.imageUrl)} 
                  alt={training.title}
                  className="new-training-image"
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

          {/* Original content sections */}
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
                            <li>Real-world projects to build your portfolio</li>
                            <li>Industry-relevant skills taught by experts</li>
                            <li>Personalized mentoring and doubt-clearing sessions</li>
                            <li>Flexible timing options available</li>
                            <li>Job placement assistance after completion</li>
                            <li>Certification upon successful completion</li>
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
                        src={training.instructor?.imageUrl && training.instructor.imageUrl !== 'default-instructor.jpg'
                            ? `${API_URL}/uploads/${training.instructor.imageUrl}`
                            : "https://placehold.co/100x100?text=Instructor"} 
                        alt={training.instructor?.name || "Instructor"} 
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
                <div className="content-box booking-box">
                  <h2>Book This Training</h2>
                  <Form onSubmit={handleSubmitBooking}>
                    {formError && <Alert variant="danger">{formError}</Alert>}
                    
                    <div className="form-group">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={bookingForm.name}
                        onChange={handleFormChange}
                        required
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={bookingForm.email}
                        onChange={handleFormChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div className="form-group">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={bookingForm.phone}
                        onChange={handleFormChange}
                        required
                        placeholder="Your phone number (e.g. +977 98XXXXXXXX)"
                        pattern="^[+]?[\s./0-9()-]+$"
                      />
                    </div>
                    
                    <div className="form-group">
                      <Form.Label>Message (Optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="message"
                        value={bookingForm.message}
                        onChange={handleFormChange}
                        placeholder="Any specific questions or requirements?"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="booking-submit-btn" 
                      disabled={formSubmitting}
                      style={{ backgroundColor: '#4A2C2A', border: 'none' }}
                    >
                      {formSubmitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <span className="ms-2">Processing...</span>
                        </>
                      ) : (
                        'Submit Booking Request'
                      )}
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
        </>
      )}
    </div>
  );
}

export default TrainingDetails; 