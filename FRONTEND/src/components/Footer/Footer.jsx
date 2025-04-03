import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-section about">
        <h3>ABOUT US</h3>
        <ul>
          <li><a href="#about">About Us</a></li>
          <li><a href="#feedback">Feedback</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </div>

      <div className="footer-section order">
        <h3>ORDER NOW</h3>
        <ul>
          <li><a href="#mains">Mains</a></li>
          <li><a href="#meals">Meals & Beverages</a></li>
          <li><a href="#promotions">Promotions</a></li>
        </ul>
      </div>

      <div className="footer-section policy">
        <h3>POLICY</h3>
        <ul>
          <li><a href="#terms">Terms & Conditions</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
        </ul>
      </div>

      <div className="footer-section account">
        <h3>MY ACCOUNT</h3>
        <ul>
          <li><a href="#sign-in">Sign In</a></li>
          <li><a href="#register">Register</a></li>
        </ul>
      </div>

      

      <div className="footer-bottom">
        <p>© 2025 Vanni Inn. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
