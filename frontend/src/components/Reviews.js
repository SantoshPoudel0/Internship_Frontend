import React from 'react';
import './Reviews.css';

function Reviews() {
  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-content">
          <div className="left-column">
            <div className="profile-container">
              <img src="images/review/frame.png" alt="Frame" className="frame-image" />
              <img src="images/review/profile.png" alt="Customer" className="profile-image" />
            </div>
            <div className="reviewer-info">
              <p className="reviewer-name">Jhon Doe, Student</p>
              <div className="rating">
                <img src="images/review/star.png" alt="Star" className="star" />
              </div>
            </div>
          </div>
          
          <div className="testimonial-container">
            <div className="quote-box">
              <img src="images/review/right.png" alt="Quote" className="quote-left" />
              <p className="testimonial-text">
                The Himalayan Java Coffee house had the best coffee around Pokhara. The shop is quiet, clean and has an outdoor sitting area to enjoy your coffee and people watch. The staff are very friendly and very helpful. The muffins here are also very good.
              </p>
              <img src="images/review/left.png" alt="Quote" className="quote-right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews; 