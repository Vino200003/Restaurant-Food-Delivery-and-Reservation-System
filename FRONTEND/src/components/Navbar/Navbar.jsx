import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Use NavLink for active link styling and import useNavigate
import { BiCart } from "react-icons/bi"; // Import Cart Icon
import { FaUserCircle } from "react-icons/fa"; // Import Profile Icon
import { CartContext } from "../../context/CartContext"; // Import CartContext
import "./Navbar.css";

const Navbar = ({ loggedIn, handleLogout }) => {
  const { cart } = useContext(CartContext); // Access cart from context
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const onLogout = () => {
    handleLogout();
    navigate("/");
  };

  // Calculate total quantity of items in the cart whenever the cart changes
  useEffect(() => {
    const calculateTotalItems = () => {
      return cart.reduce((total, item) => total + item.quantity, 0);
    };
    
    setTotalItems(calculateTotalItems());
  }, [cart]); // Dependency on cart ensures this updates when cart changes

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
        {!loggedIn ? (
          <>
            <NavLink to="/login" aria-label="Login to your account">
              <button className="login-btn">Login</button>
            </NavLink>
            <NavLink to="/signup" aria-label="Sign up for an account">
              <button className="signup-btn">Signup</button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile" aria-label="Go to your profile">
              <FaUserCircle className="profile-icon" style={{ fontSize: 32, color: "#fff", marginRight: 8, verticalAlign: "middle" }} />
            </NavLink>
            <button className="signup-btn" onClick={onLogout}>Logout</button>
          </>
        )}
        <button
          className="cart-btn"
          onClick={() => navigate('/cart')} // Navigate to the cart page
          aria-label="View your cart"
        >
          <BiCart className="cart-icon" />
          <span className="cart-qty">{totalItems}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;