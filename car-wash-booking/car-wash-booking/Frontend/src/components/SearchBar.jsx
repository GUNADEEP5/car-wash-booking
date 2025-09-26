// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [q, setQ] = useState('');
  const submit = (e) => {
    e.preventDefault();
    onSearch(q);
  };
  return (
    <form className="search-bar" onSubmit={submit}>
      <input
        type="text"
        placeholder="Search by customer or car..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button type="submit" className="btn">Search</button>
    </form>
  );
};

export default SearchBar;
