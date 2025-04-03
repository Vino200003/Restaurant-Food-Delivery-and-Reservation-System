import React from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../../components/Navbar/Navbar';
import CartTotal from '../../components/CartTotal/CartTotal';
import Footer from '../../components/Footer/Footer';

const Cart = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to the checkout page
  };

  return (
    <div>
      <CartTotal onCheckout={handleCheckout} /> {/* Pass the handler as a prop */}
      <Footer />
    </div>
  );
};

export default Cart;
