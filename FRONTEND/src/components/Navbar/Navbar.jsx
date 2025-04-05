import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Use NavLink for active link styling and import useNavigate
import { BiCart } from "react-icons/bi"; // Import Cart Icon
import { CartContext } from "../../context/CartContext"; // Import CartContext
import "./Navbar.css";

const Navbar = () => {
  const { cart } = useContext(CartContext); // Access cart from context
  const navigate = useNavigate(); // Initialize useNavigate

  // Calculate total quantity of items in the cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo" aria-label="Go to Home">
        Vanni Inn
      </NavLink>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            aria-label="Go to Home"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/menu"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            aria-label="Go to Menu"
          >
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            aria-label="Go to Contact"
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reservation"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            aria-label="Go to Reservation"
          >
            Reservation
          </NavLink>
        </li>
      </ul>
      <div className="auth-buttons">
        <NavLink to="/login" aria-label="Login to your account">
          <button className="login-btn">Login</button>
        </NavLink>
        <NavLink to="/signup" aria-label="Sign up for an account">
          <button className="signup-btn">Signup</button>
        </NavLink>
        <button
          className="cart-btn"
          onClick={() => navigate('/cart')} // Navigate to the cart page
          aria-label="View your cart"
        >
          <BiCart className="cart-icon" />
          <span className="cart-qty">0</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;