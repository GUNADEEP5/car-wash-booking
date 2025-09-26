// src/pages/AddEditBooking.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { createBooking, fetchBookingById, updateBooking } from '../services/bookingService';

const AddEditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchBookingById(id).then(data => setInitial(data)).catch(err => {
      console.error(err);
      alert('Failed to load booking');
    }).finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (payload) => {
    try {
      if (id) {
        await updateBooking(id, payload);
        alert('Booking updated');
      } else {
        await createBooking(payload);
        alert('Booking created');
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="form-page">
      <h2>{id ? 'Edit Booking' : 'Add Booking'}</h2>
      <BookingForm initial={initial} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEditBooking;
