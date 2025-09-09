import { useState } from 'react';
import "../style/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by title or author"
        value={query}
        onChange={handleChange}
        className="search-bar"
      />
      <span className="search-icon">🔍</span>
    </div>
  );
};

export default SearchBar;