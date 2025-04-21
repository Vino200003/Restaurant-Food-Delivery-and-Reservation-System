import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminNavbar.css"; // Import CSS for styling

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo" aria-label="Go to Admin Home">
        Vanni Inn Admin
      </NavLink>
      {/* Add search, notification, and profile to the right */}
      <div className="navbar-actions">
        <div className="navbar-search">
          <span className="search-icon" aria-label="Search">
            {/* Search SVG */}
            <svg width="18" height="18" fill="none" stroke="#b0b0b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input type="text" className="search-input" placeholder="Search..." />
        </div>
        <div className="notification-wrapper">
          <button className="icon-btn" aria-label="Notifications">
            {/* Bell SVG */}
            <svg width="22" height="22" fill="none" stroke="#c49b63" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 01-3.46 0"></path>
            </svg>
            <span className="notification-badge">0</span>
          </button>
        </div>
        <div className="profile-section">
          <span className="profile-avatar">
            {/* User SVG */}
            <svg width="24" height="24" fill="none" stroke="#c49b63" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M4 20c0-4 8-4 8-4s8 0 8 4"></path>
            </svg>
          </span>
          <span className="profile-name">Admin User</span>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;