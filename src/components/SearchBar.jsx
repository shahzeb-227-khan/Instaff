import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [jobKeyword, setJobKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch(jobKeyword, location);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-group">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Job title, company, or keywords"
          value={jobKeyword}
          onChange={(e) => setJobKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
      </div>

      <div className="location-input-group">
        <MapPin size={20} className="location-icon" />
        <input
          type="text"
          placeholder="City or remote"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          className="location-input"
        />
      </div>

      <button className="btn btn-primary search-btn" onClick={handleSearch}>
        Search Jobs
      </button>
    </div>
  );
};

export default SearchBar;
