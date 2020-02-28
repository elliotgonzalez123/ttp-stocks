import React, { useState } from 'react';
import { connect } from 'react-redux';
import { buyStock } from '../../actions/transactions';
import PropTypes from 'prop-types';

const Stock = ({ stock, buyStock }) => {
  const [formData, setFormData] = useState({
    qty: ''
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="dashboard-item">
      <div className="dashboard-stock">
        <h1>{stock.symbol}</h1>
        <h4>{stock.companyName}</h4>
        <h2>
          ${Math.round((stock.latestPrice + Number.EPSILON) * 100) / 100} USD{' '}
          <span className={stock.change > 0 ? 'stock-up' : 'stock-down'}>
            {stock.change} ({stock.changePercent * 100}%)
          </span>
        </h2>
      </div>
      <div className="dashboard-form-body">
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            buyStock({ symbol: stock.symbol, qty: formData.qty });
            setFormData({ ...formData, qty: '' });
          }}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="quantity"
              name="qty"
              value={formData.qty}
              onChange={onChange}
            ></input>
          </div>

          <button type="submit" className="btn btn-primary" value="Search">
            Buy
          </button>
        </form>
      </div>
    </div>
  );
};

Stock.propTypes = {
  buyStock: PropTypes.func.isRequired
};

export default connect(null, { buyStock })(Stock);
