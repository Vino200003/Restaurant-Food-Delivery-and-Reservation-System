import React from 'react';
import { FaShoppingBag, FaTruck, FaUtensils } from 'react-icons/fa'; // Importing the icons
import './OrderTypeSelection.css';

const OrderTypeSelection = () => {
  return (
    <div id="order-type-selection" className="order-page"> 
    <div id="order-type-selection" className="order-page"> {/* Added id for scrolling */}
      <div className="order-container">
        <h1>How would you like to order?</h1>
        <p>Choose your preferred ordering method</p>
        <div className="order-options">
          <div className="order-option">
            <div className="icon takeaway-icon"><FaShoppingBag /></div> {/* Takeaway Icon */}
            <h2>Takeaway</h2>
            <p>Order ahead and pick up at your convenience</p>
          </div>
          <div className="order-option">
            <div className="icon delivery-icon"><FaTruck /></div> {/* Home Delivery Icon */}
            <h2>Home Delivery</h2>
            <p>Get your favorite meals delivered to your doorstep</p>
          </div>
          <div className="order-option">
            <div className="icon dinein-icon"><FaUtensils /></div> {/* Dine In Icon */}
            <h2>Dine In</h2>
            <p>Enjoy your meal in our cozy restaurant</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrderTypeSelection;