// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import BookingCard from '../components/BookingCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import { fetchBookings, deleteBooking } from '../services/bookingService';

const HomePage = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);

  const load = async (p = 1, f = filters, s = search) => {
    try {
      setLoading(true);
      const params = { page: p, limit, ...f };
      if (s) params.search = s;
      const data = await fetchBookings(params);
      setBookings(data.bookings);
      setPage(data.page);
      setPages(data.pages);
    } catch (err) {
      console.error(err);
      alert('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(1); }, []);

  const handleFilter = (f) => {
    setFilters(f);
    load(1, f, search);
  };

  const handleSearch = (q) => {
    setSearch(q);
    load(1, filters, q);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await deleteBooking(id);
      load(page);
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const goPage = (p) => {
    if (p < 1 || p > pages) return;
    load(p, filters, search);
  };

  return (
    <div className="page">
      <div className="left">
        <FilterSidebar onFilter={handleFilter} />
      </div>
      <div className="right">
        <SearchBar onSearch={handleSearch} />
        {loading ? <p>Loading...</p> : (
          <>
            <div className="grid">
              {bookings.map(b => <BookingCard key={b._id} booking={b} onDelete={handleDelete} />)}
            </div>
            <div className="pagination">
              <button onClick={() => goPage(page-1)} disabled={page<=1}>Prev</button>
              <span>Page {page} of {pages}</span>
              <button onClick={() => goPage(page+1)} disabled={page>=pages}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
