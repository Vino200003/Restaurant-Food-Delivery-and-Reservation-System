import React, { useState } from 'react';
import './Contact.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you can add logic to send the form data to your backend if needed
  };

  return (
    <div className="contact-container">
      <div className="contact-header-section">
        <h2>
          <span className="highlight">Contact</span> Vanni Inn
        </h2>
        <p className="contact-subtitle">
          We’d love to hear from you! Whether you have a question about reservations, feedback, or anything else, our team is ready to answer all your questions.
        </p>
      </div>
      <div className="contact-content">
        <div className="contact-info-card enhanced">
          <h3>Get in Touch</h3>
          <div className="info-row">
            <FaEnvelope className="contact-icon" />
            <span>vanniinn@example.com</span>
          </div>
          <div className="info-row">
            <FaPhoneAlt className="contact-icon" />
            <span>+94 77 123 4567</span>
          </div>
          <div className="info-row">
            <FaMapMarkerAlt className="contact-icon" />
            <span>123 Main Street, Vavuniya, Sri Lanka</span>
          </div>
          <div className="contact-hours">
            <h4>Opening Hours</h4>
            <ul>
              <li>Mon - Fri: 11:00 AM - 10:00 PM</li>
              <li>Sat - Sun: 10:00 AM - 11:00 PM</li>
            </ul>
          </div>
          <div className="contact-socials">
            <a href="mailto:vanniinn@example.com" className="social-icon" title="Email">
              <FaEnvelope />
            </a>
            <a href="tel:+94771234567" className="social-icon" title="Call">
              <FaPhoneAlt />
            </a>
            {/* Add more social icons if needed */}
          </div>
        </div>
        <form className="contact-form-card enhanced" onSubmit={handleSubmit}>
          <h3>Send us a message</h3>
          <div className="input-icon-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-icon-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-icon-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>
          <button type="submit" className="contact-btn">
            <FaPaperPlane style={{ marginRight: 8 }} /> Send Message
          </button>
          {submitted && <p className="contact-success">Thank you for contacting us!</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
