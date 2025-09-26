// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Booking = require('./models/Booking');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/carwashdb';

const sampleBookings = [
  {
    customerName: 'Alice Johnson',
    carDetails: { make: 'Toyota', model: 'Corolla', year: 2018, type: 'sedan' },
    serviceType: 'Basic Wash',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    timeSlot: '09:00-10:00',
    duration: 30,
    price: 10,
    status: 'Pending',
    rating: null,
    addOns: []
  },
  {
    customerName: 'Bob Smith',
    carDetails: { make: 'Honda', model: 'Civic', year: 2020, type: 'sedan' },
    serviceType: 'Deluxe Wash',
    date: new Date(),
    timeSlot: '11:00-12:00',
    duration: 45,
    price: 20,
    status: 'Confirmed',
    rating: 5,
    addOns: ['Interior cleaning']
  },
  {
    customerName: 'Catherine Lee',
    carDetails: { make: 'BMW', model: 'X5', year: 2021, type: 'luxury' },
    serviceType: 'Full Detailing',
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    timeSlot: '14:00-17:00',
    duration: 180,
    price: 120,
    status: 'Confirmed',
    rating: 4,
    addOns: ['Polishing', 'Wax']
  },
  {
    customerName: 'David Park',
    carDetails: { make: 'Hyundai', model: 'i20', year: 2016, type: 'hatchback' },
    serviceType: 'Basic Wash',
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    timeSlot: '10:00-10:30',
    duration: 30,
    price: 8,
    status: 'Completed',
    rating: 4,
    addOns: []
  },
  {
    customerName: 'Esha Patel',
    carDetails: { make: 'Audi', model: 'A4', year: 2019, type: 'luxury' },
    serviceType: 'Deluxe Wash',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    timeSlot: '16:00-17:00',
    duration: 60,
    price: 30,
    status: 'Pending',
    rating: null,
    addOns: ['Polishing']
  }
];

const seed = async () => {
  try {
    await connectDB(MONGO_URI);
    await Booking.deleteMany({});
    await Booking.insertMany(sampleBookings);
    console.log('Seeded sample bookings');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
