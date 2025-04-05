import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, subcategories, menuItems } from '../../data/menuData';
import './FoodCollection.css';
import { CartContext } from '../../context/CartContext';

const FoodCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const { cart, addToCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = menuItems;
    if (selectedCategory !== "All") {
      filtered = menuItems.filter(item => item.category === selectedCategory);
      if (selectedCategory === "Curries" && selectedSubcategory) {
        filtered = filtered.filter(item => item.subcategory === selectedSubcategory);
      }
    }
    setFilteredItems(filtered);
  }, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory("");
  };

  const handleUpdateCart = (item, delta) => {
    if (delta > 0 && !getItemQuantity(item.id)) {
      // If adding a new item
      addToCart({ ...item, quantity: 1 });
    } else {
      // If updating quantity of existing item
      updateQuantity(item.id, delta);
    }
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="menu-container">
      <header className="menu-header">
        <h1>Our Menu</h1>
        <p>Explore our diverse menu featuring authentic dishes prepared with the finest ingredients and traditional cooking methods.</p>
        
      </header>
      
      <div className="category-scroll">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {selectedCategory === "Curries" && subcategories.Curries && (
        <div className="subcategory-scroll">
          <button
            onClick={() => setSelectedSubcategory("")}
            className={`subcategory-button ${selectedSubcategory === "" ? 'active' : ''}`}
          >
            All Curries
          </button>
          {subcategories.Curries.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`subcategory-button ${selectedSubcategory === sub ? 'active' : ''}`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
      
      <div className="food-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const quantity = getItemQuantity(item.id);
            return (
              <div key={item.id} className="food-card">
                <img src={item.image} alt={item.name} className="food-image" />
                <div className="food-details">
                  <h3>{item.name}</h3>
                  <div className="price-and-actions">
                    <span className="food-price">Rs. {item.price.toFixed(2)}</span>
                    <div className="food-actions">
                      {quantity > 0 ? (
                        <>
                          <button onClick={() => handleUpdateCart(item, -1)} className="quantity-btn">−</button>
                          <span className="quantity">{quantity}</span>
                          <button onClick={() => handleUpdateCart(item, 1)} className="quantity-btn">+</button>
                        </>
                      ) : (
                        <button onClick={() => handleUpdateCart(item, 1)} className="add-to-cart-btn">Add to Cart</button>
                      )}
                    </div>
                  </div>
                  {item.subcategory && <span className="food-subcategory">{item.subcategory}</span>}
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-items">No items found for the selected category or subcategory.</p>
        )}
      </div>
    </div>
  );
};

export default FoodCollection;
