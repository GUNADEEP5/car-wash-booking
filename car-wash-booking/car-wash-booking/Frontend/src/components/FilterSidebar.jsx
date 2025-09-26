// src/components/FilterSidebar.jsx
import React, { useState } from 'react';

const FilterSidebar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    serviceType: '',
    carType: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const apply = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const clear = () => {
    const empty = { serviceType: '', carType: '', status: '', dateFrom: '', dateTo: '' };
    setFilters(empty);
    onFilter(empty);
  };

  return (
    <form className="filter-sidebar" onSubmit={apply}>
      <h4>Filters</h4>
      <label>Service</label>
      <select name="serviceType" value={filters.serviceType} onChange={handleChange}>
        <option value="">All</option>
        <option>Basic Wash</option>
        <option>Deluxe Wash</option>
        <option>Full Detailing</option>
      </select>

      <label>Car Type</label>
      <select name="carType" value={filters.carType} onChange={handleChange}>
        <option value="">All</option>
        <option>sedan</option>
        <option>SUV</option>
        <option>hatchback</option>
        <option>luxury</option>
      </select>

      <label>Status</label>
      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">All</option>
        <option>Pending</option>
        <option>Confirmed</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>

      <label>Date From</label>
      <input name="dateFrom" type="date" value={filters.dateFrom} onChange={handleChange} />
      <label>Date To</label>
      <input name="dateTo" type="date" value={filters.dateTo} onChange={handleChange} />

      <div className="filter-actions">
        <button className="btn" type="submit">Apply</button>
        <button type="button" className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
    </form>
  );
};

export default FilterSidebar;
