import React from 'react';
import './Menu.css';

function Menu() {
  return (
    <section id="menu" className="menu-section">
      <div className="menu-container">
        <div className="menu-header">
          <h1>Menu</h1>
          <p className="menu-description">
            While most of the food in our menu changes from kitchen to kitchen and 
            from cook to cook, what remains the same is our product from the bakery.
          </p>
          <a href="#" className="view-all">View All</a>
        </div>
        
        <div className="menu-grid">
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/americano.png" alt="Americano" />
            </div>
            <div className="menu-details">
              <h3>Americano</h3>
              <p className="price">RS 150</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/blended-mocha.jpg" alt="Blended Mocha" />
            </div>
            <div className="menu-details">
              <h3>Blended Mocha</h3>
              <p className="price">RS 315</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/blended-frappe.jpg" alt="Blended Frappe" />
            </div>
            <div className="menu-details">
              <h3>Blended Frappe</h3>
              <p className="price">RS 280</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/cappucino.jpg" alt="Cappucino" />
            </div>
            <div className="menu-details">
              <h3>Cappucino</h3>
              <p className="price">RS 185</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/caffe-latte.jpg" alt="Caffe Latte" />
            </div>
            <div className="menu-details">
              <h3>Caffe Latte</h3>
              <p className="price">RS 180</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/milk-tea.jpg" alt="Milk tea" />
            </div>
            <div className="menu-details">
              <h3>Milk tea</h3>
              <p className="price">RS 80</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/cafe-latte-cookie.jpg" alt="Cafe latte with Cookie" />
            </div>
            <div className="menu-details">
              <h3>Cafe latte with Cookie</h3>
              <p className="price">RS 365</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/croissant.jpg" alt="Croosiant" />
            </div>
            <div className="menu-details">
              <h3>Croosiant</h3>
              <p className="price">RS 120</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/baguette.jpg" alt="Baguette" />
            </div>
            <div className="menu-details">
              <h3>Baguette</h3>
              <p className="price">RS 120</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/rolls.jpg" alt="Rolls" />
            </div>
            <div className="menu-details">
              <h3>Rolls</h3>
              <p className="description">Lorem, ipausm, lor</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/cheese-cake.jpg" alt="Cheese cake" />
            </div>
            <div className="menu-details">
              <h3>Cheese cake</h3>
              <p className="price">RS 300</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/brownie-icecream.jpg" alt="Brownie with Icecream" />
            </div>
            <div className="menu-details">
              <h3>Brownie with Icecream</h3>
              <p className="price">RS 280</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/iced-americano.jpg" alt="Iced Americano" />
            </div>
            <div className="menu-details">
              <h3>Iced Americano</h3>
              <p className="price">RS 195</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/flat-white.jpg" alt="Flat white" />
            </div>
            <div className="menu-details">
              <h3>Flat white</h3>
              <p className="price">RS 195</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/matcha-latte.jpg" alt="Matcha Latte" />
            </div>
            <div className="menu-details">
              <h3>Matcha Latte</h3>
              <p className="price">RS 350</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;