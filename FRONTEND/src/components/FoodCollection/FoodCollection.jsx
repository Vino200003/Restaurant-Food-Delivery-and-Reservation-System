import React, { useState } from 'react';
import './FoodCollection.css';

const FoodCollection = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="menu-container">
      {/* Category Menu */}
      <div className="category-menu">
        <h3>Categories</h3>
        <ul>
          <li><a href="#rice-curries-section" className="category-link">Rice & Curries</a></li>
          <li><a href="#fried-rice-section" className="category-link">Fried Rice</a></li>
          <li><a href="#biryani-section" className="category-link">Biryani</a></li>
          <li><a href="#nasigoreng-section" className="category-link">Nasigoreng</a></li>
          <li><a href="#lemon-rice-section" className="category-link">Lemon Rice</a></li>
          <li><a href="#string-hoppers-kottu-section" className="category-link">String Hoppers Kottu</a></li>
          <li><a href="#curries-section" className="category-link">Curries</a></li>
          <li><a href="#rotty-kothu-section" className="category-link">Rotty Kothu</a></li>
          <li><a href="#noodles-section" className="category-link">Noodles</a></li>
          <li><a href="#dolohin-section" className="category-link">Dolohin</a></li>
          <li><a href="#cheese-koththu-section" className="category-link">Cheese Koththu</a></li>
          <li><a href="#soup-section" className="category-link">Soup</a></li>
          <li><a href="#soft-drinks-section" className="category-link">Soft Drinks</a></li>
          <li><a href="#dessert-section" className="category-link">Dessert</a></li>
          <li><a href="#mineral-water-section" className="category-link">Mineral Water</a></li>
          <li><a href="#appetizer-section" className="category-link">Appetizer</a></li>
        </ul>
      </div>

      {/* Food Items */}
      <div className="food-items">
        {/* Rice & Curries Section */}
        <div id="rice-curries-section" className="category-section">
          <h3>Rice & Curries</h3>
          <div className="food-item-list">
            <div className="food-item">
              <img src="A1.jpg" alt="Rice & Curry 1" />
              <h4>Chicken Curry</h4>
              <p>$8.99</p>
              <button onClick={() => addToCart({ id: 1, name: 'Chicken Curry', price: 8.99 })}>Add to Cart</button>
            </div>
            <div className="food-item">
              <img src="A1.jpg" alt="Rice & Curry 2" />
              <h4>Vegetable Curry</h4>
              <p>$7.99</p>
              <button onClick={() => addToCart({ id: 2, name: 'Vegetable Curry', price: 7.99 })}>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Fried Rice Section */}
        <div id="fried-rice-section" className="category-section">
          <h3>Fried Rice</h3>
          <div className="food-item-list">
            <div className="food-item">
              <img src="A1.jpg" alt="Fried Rice 1" />
              <h4>Egg Fried Rice</h4>
              <p>$9.99</p>
              <button onClick={() => addToCart({ id: 3, name: 'Egg Fried Rice', price: 9.99 })}>Add to Cart</button>
            </div>
            <div className="food-item">
              <img src="A1.jpg" alt="Fried Rice 2" />
              <h4>Chicken Fried Rice</h4>
              <p>$10.99</p>
              <button onClick={() => addToCart({ id: 4, name: 'Chicken Fried Rice', price: 10.99 })}>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Biryani Section */}
        <div id="biryani-section" className="category-section">
          <h3>Biryani</h3>
          <div className="food-item-list">
            <div className="food-item">
              <img src="A1.jpg" alt="Biryani 1" />
              <h4>Chicken Biryani</h4>
              <p>$12.99</p>
              <button onClick={() => addToCart({ id: 1, name: 'Chicken Biryani', price: 12.99 })}>Add to Cart</button>
            </div>
            <div className="food-item">
              <img src="A1.jpg" alt="Biryani 2" />
              <h4>Veg Biryani</h4>
              <p>$10.99</p>
              <button onClick={() => addToCart({ id: 2, name: 'Veg Biryani', price: 10.99 })}>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Nasigoreng Section */}
        <div id="nasigoreng-section" className="category-section">
          <h3>Nasigoreng</h3>
          <div className="food-item-list">
            <div className="food-item">
              <img src="A1.jpg" alt="Nasigoreng 1" />
              <h4>Spicy Nasigoreng</h4>
              <p>$11.99</p>
              <button onClick={() => addToCart({ id: 5, name: 'Spicy Nasigoreng', price: 11.99 })}>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Lemon Rice Section */}
        <div id="lemon-rice-section" className="category-section">
          <h3>Lemon Rice</h3>
          <div className="food-item-list">
            <div className="food-item">
              <img src="A1.jpg" alt="Lemon Rice 1" />
              <h4>Lemon Rice</h4>
              <p>$6.99</p>
              <button onClick={() => addToCart({ id: 6, name: 'Lemon Rice', price: 6.99 })}>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* String Hoppers Kottu Section */}
        <div id="string-hoppers-kottu-section" className="category-section">
          <h3>String Hoppers Kottu</h3>
          <div className="food-item-list">
            <div className="food-item">
              <img src="A1.jpg" alt="String Hoppers Kottu 1" />
              <h4>Chicken Kottu</h4>
              <p>$9.99</p>
              <button onClick={() => addToCart({ id: 7, name: 'Chicken Kottu', price: 9.99 })}>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Curries Section */}
        <div id="curries-section" className="category-section">
          <h3>Curries</h3>
          <div className="food-item-list">
            <div className="food-item">
              <img src="A1.jpg" alt="Curry 1" />
              <h4>Mutton Curry</h4>
              <p>$12.99</p>
              <button onClick={() => addToCart({ id: 8, name: 'Mutton Curry', price: 12.99 })}>Add to Cart</button>
            </div>
            <div className="food-item">
              <img src="A1.jpg" alt="Curry 2" />
              <h4>Fish Curry</h4>
              <p>$10.99</p>
              <button onClick={() => addToCart({ id: 9, name: 'Fish Curry', price: 10.99 })}>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Rotty Kothu Section */}
        <div id="rotty-kothu-section" className="category-section">
          <h3>Rotty Kothu</h3>
          <div className="food-item-list">
            <div className="food-item">
              <img src="A1.jpg" alt="Rotty Kothu 1" />
              <h4>Beef Kothu</h4>
              <p>$11.99</p>
              <button onClick={() => addToCart({ id: 10, name: 'Beef Kothu', price: 11.99 })}>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Noodles Section */}
        <div id="noodles-section" className="category-section">
          <h3>Noodles</h3>
          <div className="food-item-list">
            {/* Add items for Noodles */}
          </div>
        </div>

        {/* Dolohin Section */}
        <div id="dolohin-section" className="category-section">
          <h3>Dolohin</h3>
          <div className="food-item-list">
            {/* Add items for Dolohin */}
          </div>
        </div>

        {/* Cheese Koththu Section */}
        <div id="cheese-koththu-section" className="category-section">
          <h3>Cheese Koththu</h3>
          <div className="food-item-list">
            {/* Add items for Cheese Koththu */}
          </div>
        </div>

        {/* Soup Section */}
        <div id="soup-section" className="category-section">
          <h3>Soup</h3>
          <div className="food-item-list">
            {/* Add items for Soup */}
          </div>
        </div>

        {/* Soft Drinks Section */}
        <div id="soft-drinks-section" className="category-section">
          <h3>Soft Drinks</h3>
          <div className="food-item-list">
            {/* Add items for Soft Drinks */}
          </div>
        </div>

        {/* Dessert Section */}
        <div id="dessert-section" className="category-section">
          <h3>Dessert</h3>
          <div className="food-item-list">
            <div className="food-item">
              <img src="A1.jpg" alt="Dessert 1" />
              <h4>Chocolate Cake</h4>
              <p>$5.99</p>
              <button onClick={() => addToCart({ id: 5, name: 'Chocolate Cake', price: 5.99 })}>Add to Cart</button>
            </div>
            <div className="food-item">
              <img src="A1.jpg" alt="Dessert 2" />
              <h4>Ice Cream</h4>
              <p>$3.99</p>
              <button onClick={() => addToCart({ id: 6, name: 'Ice Cream', price: 3.99 })}>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Mineral Water Section */}
        <div id="mineral-water-section" className="category-section">
          <h3>Mineral Water</h3>
          <div className="food-item-list">
            {/* Add items for Mineral Water */}
          </div>
        </div>

        {/* Appetizer Section */}
        <div id="appetizer-section" className="category-section">
          <h3>Appetizer</h3>
          <div className="food-item-list">
            {/* Add items for Appetizer */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCollection;
