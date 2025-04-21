import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminNavbar.css"; // Import CSS for styling

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo" aria-label="Go to Admin Home">
        Vanni Inn Admin
      </NavLink>
    </nav>
  );
};

export default AdminNavbar;