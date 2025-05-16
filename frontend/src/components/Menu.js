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
              <img src="/images/menu/mocha.png" alt="Blended Mocha" />
            </div>
            <div className="menu-details">
              <h3>Blended Mocha</h3>
              <p className="price">RS 315</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/frappe.png" alt="Blended Frappe" />
            </div>
            <div className="menu-details">
              <h3>Blended Frappe</h3>
              <p className="price">RS 280</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/cappucino.png" alt="Cappucino" />
            </div>
            <div className="menu-details">
              <h3>Cappucino</h3>
              <p className="price">RS 185</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/latte.png" alt="Caffe Latte" />
            </div>
            <div className="menu-details">
              <h3>Caffe Latte</h3>
              <p className="price">RS 180</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/milktea.png" alt="Milk tea" />
            </div>
            <div className="menu-details">
              <h3>Milk tea</h3>
              <p className="price">RS 80</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/cookie.png" alt="Cafe latte with Cookie" />
            </div>
            <div className="menu-details">
              <h3>Cafe latte with Cookie</h3>
              <p className="price">RS 365</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/croosiant.png" alt="Croosiant" />
            </div>
            <div className="menu-details">
              <h3>Croosiant</h3>
              <p className="price">RS 120</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/baguette.png" alt="Baguette" />
            </div>
            <div className="menu-details">
              <h3>Baguette</h3>
              <p className="price">RS 120</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/rolls.png" alt="Rolls" />
            </div>
            <div className="menu-details">
              <h3>Rolls</h3>
              <p className="description">Lorem, ipausm, lor</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/cheesecake.png" alt="Cheese cake" />
            </div>
            <div className="menu-details">
              <h3>Cheese cake</h3>
              <p className="price">RS 300</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/brownie.png" alt="Brownie with Icecream" />
            </div>
            <div className="menu-details">
              <h3>Brownie with Icecream</h3>
              <p className="price">RS 280</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/americano.png" alt="Iced Americano" />
            </div>
            <div className="menu-details">
              <h3>Iced Americano</h3>
              <p className="price">RS 195</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/flatwhite.png" alt="Flat white" />
            </div>
            <div className="menu-details">
              <h3>Flat white</h3>
              <p className="price">RS 195</p>
            </div>
          </div>
          
          <div className="menu-item">
            <div className="menu-image">
              <img src="/images/menu/latte.png" alt="Matcha Latte" />
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