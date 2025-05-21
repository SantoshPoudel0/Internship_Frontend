import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Button, Form, Row, Col, Alert, Spinner, Container } from 'react-bootstrap';
import './TrainingDetails.css';

// Add this function to fix the no-undef error
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

      // Function to get placeholder image based on training title  const getPlaceholderImage = (title, imageUrl) => {    if (imageUrl && imageUrl !== 'default-training.jpg') {      return `${API_URL}/uploads/${imageUrl}`;    }        if (title.includes('MERN')) {      return 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png';    } else if (title.includes('Python')) {      return 'https://cdn.iconscout.com/icon/free/png-256/free-python-3521655-2945099.png';    } else if (title.includes('Digital Marketing')) {      return 'https://cdn.iconscout.com/icon/free/png-256/free-marketing-1855075-1574623.png';    } else if (title.includes('Quality Assurance')) {      return 'https://cdn.iconscout.com/icon/free/png-256/free-qa-1-283367.png';    }    return 'https://placehold.co/200x100?text=Training';  };    // Function to get instructor image  const getInstructorImage = (instructor) => {    if (instructor && instructor.imageUrl && instructor.imageUrl !== 'default-instructor.jpg') {      return `${API_URL}/uploads/${instructor.imageUrl}`;    }    return 'https://placehold.co/100x100?text=Instructor';  };

  // Handle booking form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
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
    <div className="training-details-page">
      {/* Hero Background */}
      <div className="training-hero"></div>
      
      <Container>
        <div className="back-link">
          <Link to="/trainings" className="back-btn-accent">
            Back
          </Link>
        </div>

        {training && (
          <div className="training-main-container">
            <div className="training-header-section">
              <div className="training-title-area">
                <h1 className="training-heading">{training.title}</h1>
                <div className="training-meta">
                  <span className="duration-badge">Duration: {training.duration}</span>
                  <span className="price-tag">Price: Rs. {training.price}
                    {training.discount > 0 && <span className="discount"> (Rs. {training.discount} discount)</span>}
                  </span>
                </div>
              </div>
              <div className="training-image-area">
                <img 
                  src={getPlaceholderImage(training.title, training.imageUrl)} 
                  alt={training.title}
                  className="training-featured-image"
                />
              </div>
            </div>

            <div className="training-content-section">
              <div className="row">
                <div className="col-lg-8">
                  <div className="content-box description-box">
                    <h2>Training Description</h2>
                    <div className="description-content">
                      <p>{training.description}</p>
                    </div>
                  </div>

                  <div className="content-box training-highlights">
                    <h2>What You'll Learn</h2>
                    <ul className="highlights-list">
                      {training.learningTopics && training.learningTopics.length > 0 ? (
                        training.learningTopics.map((topic, index) => (
                          <li key={index}>{topic}</li>
                        ))
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
                            <p className="instructor-title">{training.instructor.title || 'Instructor'}</p>
                            <p className="instructor-bio">{training.instructor.bio || 'An experienced trainer passionate about helping students achieve their goals.'}</p>
                          </>
                        ) : (
                          <>
                            <h3>{training.title.includes('MERN') ? 'John Doe' : training.title.includes('Python') ? 'Jane Smith' : 'Alex Johnson'}</h3>
                            <p className="instructor-title">Senior {training.title.includes('MERN') ? 'Web Developer' : training.title.includes('Python') ? 'Python Developer' : training.title.includes('Digital Marketing') ? 'Marketing Manager' : 'QA Engineer'}</p>
                            <p className="instructor-bio">An experienced trainer with over 8 years of industry experience in leading companies. Passionate about mentoring new talent and helping students achieve their career goals.</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4">
                  <div className="content-box booking-box">
                    <h2>Book This Training</h2>
                    {formSuccess ? (
                      <Alert variant="success">
                        <Alert.Heading>Booking Submitted!</Alert.Heading>
                        <p>
                          Thank you for your interest in the {training.title} training. 
                          We've received your booking request and will get back to you shortly.
                        </p>
                      </Alert>
                    ) : (
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
                            type="text"
                            name="phone"
                            value={bookingForm.phone}
                            onChange={handleFormChange}
                            required
                            placeholder="Enter your phone number"
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
                    )}
                  </div>

                  <div className="content-box contact-box">
                    <h3>Need More Information?</h3>
                    <p>Contact us directly for any questions about this training program.</p>
                    <div className="contact-info">
                      <p><strong>Phone:</strong> +977-1-4123456</p>
                      <p><strong>Email:</strong> training@himalayanjava.com</p>
                      <p><strong>Location:</strong> Thamel, Kathmandu, Nepal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default TrainingDetails; 