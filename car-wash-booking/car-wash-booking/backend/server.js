// server.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// connect db
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/carwashdb';
connectDB(MONGO_URI);

// routes
app.use('/api/bookings', bookingRoutes);

// root
app.get('/', (req, res) => res.send('Car Wash Booking API is running'));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
