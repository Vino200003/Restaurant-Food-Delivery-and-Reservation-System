import React, { useContext } from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active link styling
import { BiCart } from "react-icons/bi"; // Import Cart Icon
import { CartContext } from "../../context/CartContext"; // Import CartContext
import "./Navbar.css";

const Navbar = () => {
  const { cart } = useContext(CartContext); // Access cart from context

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
        <NavLink to="/cart" aria-label="View your cart">
          <button className="cart-btn">
            <BiCart className="cart-icon" />
            {totalQuantity > 0 && <span className="cart-qty">{totalQuantity}</span>}
          </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;