import React, { useEffect, useState, useContext } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { FaRegTrashAlt } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, calculateTotalItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Cart is now directly accessed from CartContext
  }, []);

  const deleteItem = (id) => {
    removeFromCart(id);
  };

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const totalItems = calculateTotalItems();
  const subtotal = calculateSubtotal();
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>You have {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart ({totalItems} total items)</p>
      </div>
      <div className="cart-container">
        <div className="cart-items">
          <h2>Cart Items</h2>
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image small" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Rs. {item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <p className="cart-item-total">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                <FaRegTrashAlt className="delete-icon" onClick={() => deleteItem(item.id)} />
              </div>
            ))
          ) : (
            <p className="no-items">Your cart is empty. Add items to proceed.</p>
          )}
          <div className="cart-actions">
            <button onClick={() => cart.length > 0 && clearCart()}>Clear Cart</button>
            <button onClick={() => navigate('/menu')}>Continue Shopping</button>
          </div>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Delivery Fee:</span>
            <span>Rs. {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax (8%):</span>
            <span>Rs. {tax.toFixed(2)}</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
