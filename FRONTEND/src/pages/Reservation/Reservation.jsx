import React, { useState } from 'react';
import './Reservation.css';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '',
    date: '',
    time: '',
    requests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation submitted:', formData);
    alert('Reservation submitted successfully!');
  };

  return (
    <div className="reservation-container">
      <h1 className="reservation-title">Make a Reservation</h1>
      <p className="reservation-subtitle">
        Reserve your table at Vanni Inn and enjoy an unforgettable dining experience with authentic cuisine in an elegant atmosphere.
      </p>
      <div className="reservation-content">
        <div className="reservation-form">
          <h2>Reserve Your Table</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                required
              />
            </div>
            <div className="form-group">
              <label>Number of Guests</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
              >
                <option value="">Select number of guests</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Special Requests (Optional)</label>
              <textarea
                name="requests"
                value={formData.requests}
                onChange={handleChange}
                placeholder="Any dietary requirements or special occasions?"
              />
            </div>
            <button type="submit" className="reserve-button">
              Reserve a Table
            </button>
          </form>

        </div>
        
        <div className="reservation-info">
          <img
            src="RT1.jpg" // Replace with actual image URL
            alt="Dining experience"
            className="reservation-image"
          />
          <div className="info-cards">
            <div className="info-card" data-icon="📅">
              <h3>Advance Booking</h3>
              <p>Recommended 2-3 days ahead</p>
            </div>
            <div className="info-card" data-icon="👥">
              <h3>Party Size</h3>
              <p>Up to 10 people per reservation</p>
            </div>
            <div className="info-card" data-icon="⏰">
              <h3>Hours</h3>
              <p>Lunch 11AM-3PM, Dinner 5PM-10PM</p>
            </div>
            <div className="info-card" data-icon="🍴">
              <h3>Special Events</h3>
              <p>Contact us for private dining</p>
            </div>
          </div>
          <div className="reservation-policy">
            <h3>Reservation Policy</h3>
            <ul>
              <li>Reservations are held for 15 minutes past the booking time.</li>
              <li>For groups of 6 or more, please call us directly for assistance.</li>
              <li>We require 24-hour notice for cancellations to avoid a fee.</li>
              <li>Please inform us of any dietary restrictions or allergies when booking.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;