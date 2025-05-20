import React from 'react';
import './Training.css';

function Training() {
  return (
    <section id="training" className="training-section">
      <div className="training-container">
        <div className="training-header">
          <h1>Coffee Training Academy</h1>
          <p className="training-description">
            Join our professional coffee training sessions to master the art of brewing, 
            latte art, and coffee appreciation. Whether you're a beginner or looking to advance your skills, 
            we have the perfect course for you.
          </p>
        </div>
        
        <div className="training-grid">
          <div className="training-item">
            <div className="training-image">
              <img src="/images/training/barista-basics.jpg" alt="Barista Basics" />
            </div>
            <div className="training-content">
              <h3>Barista Basics</h3>
              <p className="training-price">RS 2,500</p>
              <p className="training-duration">Duration: 2 Days</p>
              <p className="training-text">
                Learn the fundamentals of coffee preparation, machine handling, and basic latte art techniques. Perfect for beginners.
              </p>
              <button className="enroll-button">Enroll Now</button>
            </div>
          </div>
          
          <div className="training-item">
            <div className="training-image">
              <img src="/images/training/latte-art.jpg" alt="Advanced Latte Art" />
            </div>
            <div className="training-content">
              <h3>Advanced Latte Art</h3>
              <p className="training-price">RS 3,200</p>
              <p className="training-duration">Duration: 3 Days</p>
              <p className="training-text">
                Master complex latte art designs, from rosettes to tulips and beyond. For those with basic barista experience.
              </p>
              <button className="enroll-button">Enroll Now</button>
            </div>
          </div>
          
          <div className="training-item">
            <div className="training-image">
              <img src="/images/training/coffee-tasting.jpg" alt="Coffee Tasting & Appreciation" />
            </div>
            <div className="training-content">
              <h3>Coffee Tasting & Appreciation</h3>
              <p className="training-price">RS 1,800</p>
              <p className="training-duration">Duration: 1 Day</p>
              <p className="training-text">
                Develop your palate to identify coffee origins, processing methods, and flavor profiles. Includes tasting of premium coffees.
              </p>
              <button className="enroll-button">Enroll Now</button>
            </div>
          </div>
          
          <div className="training-item">
            <div className="training-image">
              <img src="/images/training/brewing-methods.jpg" alt="Alternative Brewing Methods" />
            </div>
            <div className="training-content">
              <h3>Alternative Brewing Methods</h3>
              <p className="training-price">RS 2,200</p>
              <p className="training-duration">Duration: 2 Days</p>
              <p className="training-text">
                Explore pour-over, AeroPress, French press, and other manual brewing techniques to bring out the best in specialty coffees.
              </p>
              <button className="enroll-button">Enroll Now</button>
            </div>
          </div>
          
          <div className="training-item">
            <div className="training-image">
              <img src="/images/training/coffee-roasting.jpg" alt="Coffee Roasting Workshop" />
            </div>
            <div className="training-content">
              <h3>Coffee Roasting Workshop</h3>
              <p className="training-price">RS 4,500</p>
              <p className="training-duration">Duration: 3 Days</p>
              <p className="training-text">
                Learn the science and art of coffee roasting, from green bean selection to developing flavor profiles through roast curves.
              </p>
              <button className="enroll-button">Enroll Now</button>
            </div>
          </div>
          
          <div className="training-item">
            <div className="training-image">
              <img src="/images/training/cafe-management.jpg" alt="Café Management Essentials" />
            </div>
            <div className="training-content">
              <h3>Café Management Essentials</h3>
              <p className="training-price">RS 5,800</p>
              <p className="training-duration">Duration: 5 Days</p>
              <p className="training-text">
                Comprehensive training on running a successful café, covering operations, staff management, and business strategies.
              </p>
              <button className="enroll-button">Enroll Now</button>
            </div>
          </div>
        </div>
        
        <div className="certification-section">
          <div className="certification-content">
            <h2>Professional Certification</h2>
            <p>All our training courses come with internationally recognized certification. Our trainers are industry experts with years of experience in specialty coffee.</p>
            <p>Group discounts are available for teams of 3 or more people. Contact us for custom training programs for your café or restaurant.</p>
          </div>
          <div className="certification-image">
            <img src="/images/training/certification.jpg" alt="Coffee Certification" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Training; 