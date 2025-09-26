// controllers/bookingController.js
const Booking = require('../models/Booking');
const Joi = require('joi');

// Validation schema for create/update
const bookingSchema = Joi.object({
  customerName: Joi.string().min(1).required(),
  carDetails: Joi.object().keys({
    make: Joi.string().allow(''),
    model: Joi.string().allow(''),
    year: Joi.number().integer().min(1900).max(2100).allow(null),
    type: Joi.string().allow('')
  }).default({}),
  serviceType: Joi.string().valid('Basic Wash','Deluxe Wash','Full Detailing').required(),
  date: Joi.date().required(),
  timeSlot: Joi.string().allow(''),
  duration: Joi.number().integer().min(0).allow(null),
  price: Joi.number().min(0).allow(null),
  status: Joi.string().valid('Pending','Confirmed','Completed','Cancelled').default('Pending'),
  rating: Joi.number().min(1).max(5).allow(null),
  addOns: Joi.array().items(Joi.string()).default([])
});

exports.createBooking = async (req, res, next) => {
  try {
    const { error, value } = bookingSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const booking = await Booking.create(value);
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    // filters: serviceType, carType, status, dateFrom, dateTo
    const {
      page = 1,
      limit = 10,
      serviceType,
      carType,
      status,
      dateFrom,
      dateTo,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search
    } = req.query;

    const query = {};

    if (serviceType) query.serviceType = serviceType;
    if (status) query.status = status;
    if (carType) query['carDetails.type'] = carType;
    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = new Date(dateFrom);
      if (dateTo) query.date.$lte = new Date(dateTo);
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [total, bookings] = await Promise.all([
      Booking.countDocuments(query),
      Booking.find(query).sort(sort).skip(skip).limit(parseInt(limit))
    ]);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      bookings
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const { error, value } = bookingSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const booking = await Booking.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    next(err);
  }
};
