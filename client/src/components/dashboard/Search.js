import React, { useState } from 'react';

const Search = ({ onSearchSubmit }) => {
  const [formData, setFormData] = useState({
    symbol: ''
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1>Search Stocks:</h1>
      <p>Search the markets for the stock you want to purchase!</p>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          onSearchSubmit(formData);
          setFormData({ ...formData, symbol: '' });
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="stock symbol"
            name="symbol"
            value={formData.symbol}
            onChange={onChange}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary" value="Search">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
