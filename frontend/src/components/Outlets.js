import React from 'react';
import './Outlets.css';

function Outlets() {
  return (
    <section id="outlets" className="outlets-section">
      <div className="outlets-container">
        <div className="outlets-header">
          <h1>Find Us</h1>
          <p className="outlets-description">
            Himalayan Java outlets are available with the best 
            coffee throughout the major cities of Nepal.
          </p>
        </div>
        
        <div className="outlets-grid">
          {/* First Row */}
          <div className="outlet-card">
            <div className="outlet-image">
              <img src="/images/findus/patan.png" alt="Patan Durbar Square" />
            </div>
            <h3 className="outlet-location">Patan Durbar Square</h3>
          </div>
          
          <div className="outlet-card">
            <div className="outlet-image">
              <img src="/images/findus/pokhara.png" alt="Lakeside, Pokhara" />
            </div>
            <h3 className="outlet-location">Lakeside, Pokhara</h3>
          </div>
          
          <div className="outlet-card">
            <div className="outlet-image">
              <img src="/images/findus/mandalastreet.png" alt="Mandala Street" />
            </div>
            <h3 className="outlet-location">Mandala Street</h3>
          </div>
          
          <div className="outlet-card">
            <div className="outlet-image">
              <img src="/images/findus/namchebajar.png" alt="Namche Bazar" />
            </div>
            <h3 className="outlet-location">Namche Bazar</h3>
          </div>
          
          {/* Second Row */}
          <div className="outlet-card">
            <div className="outlet-image">
              <img src="/images/findus/boudhanath.png" alt="Boudhanath Stupa" />
            </div>
            <h3 className="outlet-location">Boudhanath Stupa</h3>
          </div>
          
          <div className="outlet-card">
            <div className="outlet-image">
              <img src="/images/findus/pashupatinath.png" alt="Pashupatinath Marga" />
            </div>
            <h3 className="outlet-location">Pashupatinath Marga</h3>
          </div>
          
          <div className="outlet-card">
            <div className="outlet-image">
              <img src="/images/findus/thamel.png" alt="Thamel" />
            </div>
            <h3 className="outlet-location">Thamel</h3>
          </div>
          
          <div className="outlet-card">
            <div className="outlet-image">
              <img src="/images/findus/basantapur.png" alt="Basantapur" />
            </div>
            <h3 className="outlet-location">Basantapur</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Outlets;