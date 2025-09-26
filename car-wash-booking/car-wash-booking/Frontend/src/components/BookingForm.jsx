// src/components/BookingForm.jsx
import React, { useState, useEffect } from 'react';

const BookingForm = ({ initial = {}, onSubmit }) => {
  const [form, setForm] = useState({
    customerName: '',
    carMake: '',
    carModel: '',
    carYear: '',
    carType: '',
    serviceType: 'Basic Wash',
    date: '',
    timeSlot: '',
    duration: '',
    price: '',
    status: 'Pending',
    addOns: ''
  });

  useEffect(() => {
    if (initial && initial._id) {
      setForm({
        customerName: initial.customerName || '',
        carMake: initial.carDetails?.make || '',
        carModel: initial.carDetails?.model || '',
        carYear: initial.carDetails?.year || '',
        carType: initial.carDetails?.type || '',
        serviceType: initial.serviceType || 'Basic Wash',
        date: initial.date ? new Date(initial.date).toISOString().slice(0,10) : '',
        timeSlot: initial.timeSlot || '',
        duration: initial.duration || '',
        price: initial.price || '',
        status: initial.status || 'Pending',
        addOns: (initial.addOns || []).join(', ')
      });
    }
  }, [initial]);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      customerName: form.customerName,
      carDetails: { make: form.carMake, model: form.carModel, year: form.carYear ? parseInt(form.carYear) : undefined, type: form.carType },
      serviceType: form.serviceType,
      date: form.date,
      timeSlot: form.timeSlot,
      duration: form.duration ? parseInt(form.duration) : undefined,
      price: form.price ? parseFloat(form.price) : undefined,
      status: form.status,
      addOns: form.addOns ? form.addOns.split(',').map(s => s.trim()).filter(Boolean) : []
    };
    onSubmit(payload);
  };

  return (
    <form className="booking-form" onSubmit={submit}>
      <label>Customer Name</label>
      <input name="customerName" value={form.customerName} onChange={handle} required />

      <label>Car Make</label>
      <input name="carMake" value={form.carMake} onChange={handle} />

      <label>Car Model</label>
      <input name="carModel" value={form.carModel} onChange={handle} />

      <label>Car Year</label>
      <input name="carYear" value={form.carYear} onChange={handle} type="number" />

      <label>Car Type</label>
      <input name="carType" value={form.carType} onChange={handle} placeholder="sedan, SUV..." />

      <label>Service Type</label>
      <select name="serviceType" value={form.serviceType} onChange={handle}>
        <option>Basic Wash</option>
        <option>Deluxe Wash</option>
        <option>Full Detailing</option>
      </select>

      <label>Date</label>
      <input name="date" type="date" value={form.date} onChange={handle} required />

      <label>Time Slot</label>
      <input name="timeSlot" value={form.timeSlot} onChange={handle} />

      <label>Duration (mins)</label>
      <input name="duration" type="number" value={form.duration} onChange={handle} />

      <label>Price</label>
      <input name="price" type="number" value={form.price} onChange={handle} />

      <label>Status</label>
      <select name="status" value={form.status} onChange={handle}>
        <option>Pending</option>
        <option>Confirmed</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>

      <label>Add-Ons (comma separated)</label>
      <input name="addOns" value={form.addOns} onChange={handle} />

      <div className="form-actions">
        <button className="btn" type="submit">Save</button>
      </div>
    </form>
  );
};

export default BookingForm;
