import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext'; // Import CartContext
import './CartTotal.css';

const CartTotal = ({ onCheckout }) => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext); // Access cart and actions

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const subtotal = calculateSubtotal();
  const shipping = 0.0;
  const taxes = 0.0;
  const couponDiscount = 10.0;
  const total = subtotal - couponDiscount;

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
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
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="product-info">
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
                      <img src="A1.jpg" alt={item.name} />
                      <div>
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>Rs.{item.price.toFixed(2)}</td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </td>
                  <td>Rs.{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <p><span>Items:</span><span>{cart.reduce((total, item) => total + item.quantity, 0)}</span></p>
          <p><span>Sub-Total:</span><span>Rs.{subtotal.toFixed(2)}</span></p>
          <p><span>Shipping:</span><span>Rs.{shipping.toFixed(2)}</span></p>
          <p><span>Taxes:</span><span>Rs.{taxes.toFixed(2)}</span></p>
          <p><span>Coupon Discount:</span><span>-Rs.{couponDiscount.toFixed(2)}</span></p>
          <h3><span>Total:</span><span>Rs.{total.toFixed(2)}</span></h3>
          <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
