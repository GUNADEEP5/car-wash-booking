// src/pages/BookingDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchBookingById, deleteBooking } from '../services/bookingService';

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBookingById(id);
        setBooking(data);
      } catch (err) {
        console.error(err);
        alert('Failed to load booking');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await deleteBooking(id);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!booking) return <p>Booking not found</p>;

  return (
    <div className="detail">
      <h2>{booking.customerName}</h2>
      <p><strong>Service:</strong> {booking.serviceType}</p>
      <p><strong>Car:</strong> {booking.carDetails.make} {booking.carDetails.model} ({booking.carDetails.type})</p>
      <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
      <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
      <p><strong>Duration:</strong> {booking.duration} mins</p>
      <p><strong>Price:</strong> ${booking.price}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <p><strong>Add-Ons:</strong> {(booking.addOns || []).join(', ')}</p>
      <div className="detail-actions">
        <Link className="btn" to={`/booking/edit/${booking._id}`}>Edit</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        <Link className="btn" to="/">Back</Link>
      </div>
    </div>
  );
};

export default BookingDetail;
