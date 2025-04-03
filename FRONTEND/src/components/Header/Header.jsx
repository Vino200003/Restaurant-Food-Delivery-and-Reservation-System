import React from "react";
import "./Header.css";
import { FaShoppingCart, FaCalendarAlt } from "react-icons/fa"; // Import necessary icons
import { Link } from "react-router-dom"; // Import Link for navigation

const Header = () => {
  return (
    <div className="header">
      <div className="header-text">
        <h1>
          Life is what you eat<br />
          <span>
            Explore a variety of <br />
            culinary delights from top chefs
          </span>
        </h1>
        <a href="#order-type-selection">
          <button>
            <FaShoppingCart className="button-icon" /> Order Online
          </button>
        </a>
        <Link to="/reservation">
          <button>
            <FaCalendarAlt className="button-icon" /> Book Table
          </button>
        </Link>
      </div>
      <div className="header-image">
        <img src="Header5.png" alt="Steak in pan" />
      </div>
    </div>
  );
};

export default Header;