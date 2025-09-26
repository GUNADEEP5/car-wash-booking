import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingDetail from './pages/BookingDetail';
import AddEditBooking from './pages/AddEditBooking';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking/new" element={<AddEditBooking />} />
          <Route path="/booking/edit/:id" element={<AddEditBooking />} />
          <Route path="/booking/:id" element={<BookingDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
