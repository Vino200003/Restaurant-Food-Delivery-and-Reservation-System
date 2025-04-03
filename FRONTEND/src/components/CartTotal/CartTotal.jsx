import React, { useState } from 'react';
import './CartTotal.css';

const CartTotal = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Fresh Oranges', price: 11.75, quantity: 4, weight: '500 g' },
    { id: 2, name: 'Red Onion', price: 8.0, quantity: 2, weight: '500 g' },
    { id: 3, name: 'Fresh Yellow Lemon', price: 8.0, quantity: 1, weight: '1 Kg' },
    { id: 4, name: 'Pomegranate', price: 7.2, quantity: 2, weight: '500 g' },
  ]);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const subtotal = calculateSubtotal();
  const shipping = 0.0;
  const taxes = 0.0;
  const couponDiscount = 10.0;
  const total = subtotal - couponDiscount;

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        {/* Cart Items */}
        <div className="cart-items">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="product-info">
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        ×
                      </button>
                      <img src="A1.jpg" alt={item.name} />
                      <div>
                        <p>{item.name}</p>
                        <small>{item.weight}</small>
                      </div>
                    </div>
                  </td>
                  <td>Rs.{item.price.toFixed(2)}</td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>Rs.{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <p>
            <span>Items:</span>
            <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
          </p>
          <p>
            <span>Sub-Total:</span>
            <span>Rs.{subtotal.toFixed(2)}</span>
          </p>
          <p>
            <span>Shipping:</span>
            <span>Rs.{shipping.toFixed(2)}</span>
          </p>
          <p>
            <span>Taxes:</span>
            <span>Rs.{taxes.toFixed(2)}</span>
          </p>
          <p>
            <span>Coupon Discount:</span>
            <span>-Rs.{couponDiscount.toFixed(2)}</span>
          </p>
          <h3>
            <span>Total:</span>
            <span>Rs.{total.toFixed(2)}</span>
          </h3>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
