import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="landing-section">
        <div className="coffee-bean-bg">
          <svg width="290" height="290" viewBox="0 0 290 290" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <g opacity="0.1">
                <path d="M-41.7904 6.56526C-61.5581 48.157 -27.8951 105.489 33.3979 134.621C94.691 163.752 160.404 153.651 180.171 112.059C199.939 70.4673 166.276 13.135 104.983 -15.9963C43.69 -45.1276 -22.0227 -35.0264 -41.7904 6.56526Z" fill="#CA9D5C"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M-41.7843 6.56354C-41.7561 6.50409 -41.6614 6.52967 -41.6738 6.59666C-46.3874 45.4873 -13.0258 92.1053 41.1289 117.844C95.3153 143.598 152.565 140.006 179.724 111.754C179.943 111.518 180.315 111.768 180.177 112.057C160.41 153.647 94.6971 163.75 33.404 134.619C-27.8892 105.487 -61.5512 48.1536 -41.7843 6.56354Z" fill="#6A462F"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M-29.8988 12.2147C-29.8988 12.2147 25.7687 9.5186 80.4942 35.5285C135.033 61.4498 168.055 106.104 168.281 106.406C168.122 106.189 151.618 83.9088 124.388 70.967C97.027 57.963 69.1913 59.3101 69.1913 59.3101C69.1913 59.3101 41.3595 60.6591 13.9948 47.6532C-13.3659 34.6492 -29.8988 12.2147 -29.8988 12.2147Z" fill="#6A462F"/>
                <path d="M-41.7904 6.56526C-61.5581 48.157 -27.8951 105.489 33.3979 134.621C94.691 163.752 160.404 153.651 180.171 112.059C199.939 70.4673 166.276 13.135 104.983 -15.9963C43.69 -45.1276 -22.0227 -35.0264 -41.7904 6.56526Z" stroke="black" strokeWidth="0.75"/>
                <path d="M69.1911 59.3108C69.1911 59.3108 97.0229 57.9618 124.388 70.9677C151.752 83.9735 168.281 106.406 168.281 106.406" stroke="black" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M69.1926 59.3112C69.1926 59.3112 41.3608 60.6601 13.9961 47.6542C-13.3686 34.6484 -29.8974 12.2157 -29.8974 12.2157" stroke="black" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </g>
          </svg>
        </div>
        <div className="landing-content">
          <div className="left-content">
            <h1>From Crop To Cup</h1>
            <p>Himalayan Java Coffee Beans are grown locally and are roasted to perfection in the ideal Himalayan air. It is then packaged immediately and rushed off to our outlets which ensures we deliver the best coffee experience possible for all of our customers.</p>
            <div className="cta-buttons">
              <button className="btn-primary">See Menu</button>
            </div>
            <div className="social-icons-container">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="right-content">
            <img src="/cofee-image-homepage.svg" alt="Coffee" className="coffee-image" />
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">7</span>
                <span className="stat-text">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">25k+</span>
                <span className="stat-text">Coffee Consumed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">35k+</span>
                <span className="stat-text">Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 