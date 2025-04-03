import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-text">
        <h2>About Us</h2>
        <p>Vanni Inn is where tradition meets taste. We bring you authentic flavors of the Vanni region with a touch of warmth and simplicity. Whether it's a hearty rice and curry, spicy seafood delight, or a freshly brewed cup of local tea, we believe in serving meals that feel like home.

Our passion is rooted in heritage and homemade goodness. We’re a proud local team from the North, sharing our culinary story through every dish. Step into Vanni Inn and experience the heart of northern hospitality—simple, soulful, and satisfying.</p>
      </div>
      <div className="about-us-image">
        <img src="About.png" alt="About Us" />
      </div>
    </div>
  );
};

export default AboutUs;
