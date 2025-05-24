import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import { API_URL } from '../utils/constants';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Only fetch available items
        const { data } = await axios.get(`${API_URL}/api/menu-items?available=true`);
        setMenuItems(data);
      } catch (err) {
        setError('Failed to load menu items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleImageError = (itemId) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [itemId]: true
    }));
  };

  const getImageUrl = (item) => {
    if (imageLoadErrors[item._id]) {
      return `/images/menu/${item.category.toLowerCase()}.png`;
    }
    return item.imageUrl && item.imageUrl !== 'default-menu-item.jpg'
      ? `${API_URL}/uploads/${item.imageUrl}`
      : `/images/menu/${item.category.toLowerCase()}.png`;
  };

  const categories = ['all', 'Coffee', 'Tea', 'Pastry', 'Dessert', 'Snack', 'Other'];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="menu-section">
      <div className="menu-container">
        <div className="menu-header">
          <h1>Menu</h1>
          <p className="menu-description">
            While most of the food in our menu changes from kitchen to kitchen and 
            from cook to cook, what remains the same is our product from the bakery.
          </p>
          
          <div className="menu-categories">
            {categories.map(category => (
              <button 
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'all' ? 'All Items' : category}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <p className="text-center">Loading menu items...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : (
          <div className={`menu-grid ${filteredItems.length === 1 ? 'single-item' : ''}`}>
            {filteredItems.length === 0 ? (
              <p className="text-center">No items found in this category</p>
            ) : (
              filteredItems.map(item => (
                <div className="menu-item" key={item._id}>
                  <div className="menu-image">
                    <img 
                      src={getImageUrl(item)}
                      alt={item.name}
                      onError={() => handleImageError(item._id)}
                      loading="lazy"
                    />
                    {item.featured && <span className="featured-badge">★ Featured</span>}
                  </div>
                  <div className="menu-details">
                    <h3>{item.name}</h3>
                    <p className="price">RS {item.price}</p>
                    {item.description && <p className="description">{item.description}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;