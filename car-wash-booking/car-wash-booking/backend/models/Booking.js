// models/Booking.js
const mongoose = require('mongoose');

const CarDetailsSchema = new mongoose.Schema({
  make: { type: String, default: '' },
  model: { type: String, default: '' },
  year: { type: Number },
  type: { type: String, default: '' } // sedan, SUV, hatchback, luxury
}, { _id: false });

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  carDetails: { type: CarDetailsSchema, default: {} },
  serviceType: { type: String, required: true, enum: ['Basic Wash','Deluxe Wash','Full Detailing'] },
  date: { type: Date, required: true },
  timeSlot: { type: String }, // e.g. "09:00-10:00"
  duration: { type: Number }, // minutes
  price: { type: Number, default: 0 },
  status: { type: String, default: 'Pending', enum: ['Pending','Confirmed','Completed','Cancelled'] },
  rating: { type: Number, min: 1, max: 5 },
  addOns: [{ type: String }],
}, { timestamps: true });

BookingSchema.index({ customerName: 'text', 'carDetails.make': 'text', 'carDetails.model': 'text' });

module.exports = mongoose.model('Booking', BookingSchema);
