// src/services/bookingService.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchBookings = (params) =>
  axios.get(`${API_BASE}/bookings`, { params }).then(res => res.data);

export const fetchBookingById = (id) =>
  axios.get(`${API_BASE}/bookings/${id}`).then(res => res.data);

export const createBooking = (data) =>
  axios.post(`${API_BASE}/bookings`, data).then(res => res.data);

export const updateBooking = (id, data) =>
  axios.put(`${API_BASE}/bookings/${id}`, data).then(res => res.data);

export const deleteBooking = (id) =>
  axios.delete(`${API_BASE}/bookings/${id}`).then(res => res.data);
