// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingController');

// /api/bookings
router.get('/', controller.getBookings);
router.post('/', controller.createBooking);
router.get('/:id', controller.getBookingById);
router.put('/:id', controller.updateBooking);
router.delete('/:id', controller.deleteBooking);

module.exports = router;
