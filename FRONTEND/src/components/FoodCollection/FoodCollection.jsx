import React, { useState } from 'react';
import './FoodCollection.css';
import { Link } from 'react-router-dom';

const FoodCollection = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const menuItems = [
    {
      category: 'Rice & Curries',
      items: [
        { id: 1, name: 'Special Fried Rice', price: 25, img: 'image-url-here' },
        { id: 2, name: 'Chicken Curry', price: 20, img: 'image-url-here' },
      ],
    },
    {
      category: 'Fried Rice',
      items: [
        { id: 3, name: 'Spicy Fried Rice', price: 18, img: 'image-url-here' },
        { id: 4, name: 'Vegetable Fried Rice', price: 15, img: 'image-url-here' },
      ],
    },
    {
      category: 'Briyani',
      items: [
        { id: 5, name: 'Chicken Briyani', price: 22, img: 'image-url-here' },
        { id: 6, name: 'Mutton Briyani', price: 24, img: 'image-url-here' },
      ],
    },
    {
      category: 'Curries',
      subcategories: [
        {
          name: 'Mutton Curry',
          items: [
            { id: 7, name: 'Mutton Curry with Rice', price: 20, img: 'image-url-here' },
          ],
        },
        {
          name: 'Chicken Curry',
          items: [
            { id: 8, name: 'Chicken Curry with Rice', price: 22, img: 'image-url-here' },
          ],
        },
      ],
    },
    // Add more categories and items similarly
  ];

  return (
    <div className="menu-container">
      <div className="category-menu">
        <h3>Explore Our Categories</h3>
        <ul>
          {menuItems.map((category, index) => (
            <li key={index}>
              <Link to={`#${category.category.replace(/\s+/g, '')}`} className="category-link">
                {category.category}
              </Link>
              {category.subcategories && (
                <ul className="subcategory-list">
                  {category.subcategories.map((sub, idx) => (
                    <li key={idx}>
                      <Link to={`#${sub.name.replace(/\s+/g, '')}`} className="subcategory-link">
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="food-items">
        {menuItems.map((category, index) => (
          <div key={index} className="category-section" id={category.category.replace(/\s+/g, '')}>
            <h3>{category.category}</h3>
            {category.subcategories ? (
              category.subcategories.map((sub, subIndex) => (
                <div key={subIndex} id={sub.name.replace(/\s+/g, '')}>
                  <h4>{sub.name}</h4>
                  <div className="food-item-list">
                    {sub.items.map((item) => (
                      <div key={item.id} className="food-item">
                        <img src={item.img} alt={item.name} />
                        <h4>{item.name}</h4>
                        <p>${item.price}</p>
                        <button onClick={() => addToCart(item)}>Add To Cart</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="food-item-list">
                {category.items.map((item) => (
                  <div key={item.id} className="food-item">
                    <img src={item.img} alt={item.name} />
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>
                    <button onClick={() => addToCart(item)}>Add To Cart</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCollection;
