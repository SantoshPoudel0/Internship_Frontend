import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import { API_URL } from '../utils/constants';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const [isUsingFallback, setIsUsingFallback] = useState(true);

  // Fallback menu items that match what would come from the server
  const fallbackMenuItems = [
    {
      _id: "1",
      name: "Cappuccino",
      price: 180,
      category: "Coffee",
      description: "Espresso with steamed milk and foam",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "2",
      name: "Espresso",
      price: 150,
      category: "Coffee",
      description: "Strong black coffee brewed by forcing hot water through ground coffee beans",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "3",
      name: "Americano",
      price: 160,
      category: "Coffee",
      description: "Espresso diluted with hot water",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "4",
      name: "Latte",
      price: 190,
      category: "Coffee",
      description: "Espresso with steamed milk and a small amount of foam",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "5",
      name: "Mocha",
      price: 210,
      category: "Coffee",
      description: "Espresso with chocolate and steamed milk",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "6",
      name: "Flat White",
      price: 200,
      category: "Coffee",
      description: "Espresso with steamed milk and microfoam",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "7",
      name: "Green Tea",
      price: 120,
      category: "Tea",
      description: "Traditional tea made from Camellia sinensis leaves",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "8",
      name: "Milk Tea",
      price: 140,
      category: "Tea",
      description: "Tea with milk and sugar",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "9",
      name: "Chocolate Croissant",
      price: 160,
      category: "Pastry",
      description: "Buttery, flaky pastry filled with chocolate",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "10",
      name: "Plain Croissant",
      price: 140,
      category: "Pastry",
      description: "Classic buttery, flaky pastry",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "11",
      name: "Cheesecake",
      price: 220,
      category: "Dessert",
      description: "Creamy dessert with a graham cracker crust",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "12",
      name: "Brownie",
      price: 180,
      category: "Dessert",
      description: "Rich chocolate dessert with nuts",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "13",
      name: "Chocolate Chip Cookie",
      price: 120,
      category: "Dessert",
      description: "Classic cookie with chocolate chips",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "14",
      name: "Chicken Sandwich",
      price: 250,
      category: "Snack",
      description: "Grilled chicken with lettuce and mayo on fresh bread",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    },
    {
      _id: "15",
      name: "Veggie Rolls",
      price: 220,
      category: "Snack",
      description: "Fresh vegetables wrapped in a soft roll",
      featured: false,
      available: true,
      imageUrl: "default-menu-item.jpg"
    }
  ];

  useEffect(() => {
    // Always initialize with fallback menu items
    setMenuItems(fallbackMenuItems);
    setIsUsingFallback(true);
    
    const fetchMenuItems = async () => {
      try {
        // Set a timeout for the API request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
        
        // Only fetch available items
        const { data } = await axios.get(`${API_URL}/api/menu-items?available=true`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (data && data.length > 0) {
          setMenuItems(data);
          setIsUsingFallback(false);
        }
      } catch (err) {
        console.error('Error fetching menu items:', err);
        // Fallback menu items are already set, no need to do anything here
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

  // Map item names to actual image filenames in the public folder
  const getLocalImageName = (item) => {
    const nameToImageMap = {
      'Cappuccino': 'cappucino.png',
      'Espresso': 'americano.png',
      'Americano': 'americano.png',
      'Latte': 'latte.png',
      'Mocha': 'mocha.png',
      'Flat White': 'flatwhite.png',
      'Green Tea': 'milktea.png',
      'Milk Tea': 'milktea.png',
      'Chocolate Croissant': 'croosiant.png',
      'Plain Croissant': 'croosiant.png',
      'Cheesecake': 'cheesecake.png',
      'Brownie': 'brownie.png',
      'Chocolate Chip Cookie': 'cookie.png',
      'Chicken Sandwich': 'rolls.png',
      'Veggie Rolls': 'rolls.png',
      'Coffee': 'cappucino.png',
      'Tea': 'milktea.png',
      'Pastry': 'croosiant.png',
      'Dessert': 'cheesecake.png',
      'Snack': 'rolls.png',
      'Other': 'brownie.png'
    };
    
    return nameToImageMap[item.name] || nameToImageMap[item.category] || 'cappucino.png';
  };

  const getImageUrl = (item) => {
    // When backend is offline or image loading fails, use local images
    if (isUsingFallback || !item.imageUrl || item.imageUrl === 'default-menu-item.jpg' || imageLoadErrors[item._id]) {
      return `/images/menu/${getLocalImageName(item)}`;
    }
    
    // Try to use the server image if available
    try {
      return `${API_URL}/uploads/${item.imageUrl}`;
    } catch (err) {
      return `/images/menu/${getLocalImageName(item)}`;
    }
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
                  {!isUsingFallback && item.featured && <span className="featured-badge">★ Featured</span>}
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
      </div>
    </section>
  );
}

export default Menu;