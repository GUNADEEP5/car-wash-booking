// src/components/BookingCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BookingCard = ({ booking, onDelete }) => {
  const dateStr = new Date(booking.date).toLocaleDateString();
  return (
    <div className="card">
      <h3>{booking.customerName}</h3>
      <p><strong>Car:</strong> {booking.carDetails.make} {booking.carDetails.model} ({booking.carDetails.type})</p>
      <p><strong>Service:</strong> {booking.serviceType}</p>
      <p><strong>Date:</strong> {dateStr} | <strong>Slot:</strong> {booking.timeSlot}</p>
      <p><strong>Price:</strong> ${booking.price} | <strong>Status:</strong> {booking.status}</p>
      <div className="card-actions">
        <Link to={`/booking/${booking._id}`} className="btn">View</Link>
        <Link to={`/booking/edit/${booking._id}`} className="btn">Edit</Link>
        <button className="btn btn-danger" onClick={() => onDelete(booking._id)}>Delete</button>
      </div>
    </div>
  );
};

export default BookingCard;
