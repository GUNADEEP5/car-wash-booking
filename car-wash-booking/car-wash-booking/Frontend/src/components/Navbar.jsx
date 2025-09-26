// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="nav-container">
      <Link to="/" className="brand">CarWash</Link>
      <div>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/booking/new" className="nav-link btn-primary">Add Booking</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
