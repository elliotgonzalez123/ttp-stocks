import React, { useState } from 'react';

const Search = ({ onSearchSubmit }) => {
  const [formData, setFormData] = useState({
    symbol: ''
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="dashboard-card-header">
        <h1 style={{ color: '#F49E2F' }}>Search Stocks:</h1>
        <i className="fas fa-search fa-2x" style={{ color: '#8136E9' }}></i>
      </div>
      <div className="dashboard-form-body">
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
    </>
  );
};

export default Search;
