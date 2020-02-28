import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { buyStock } from '../../actions/transactions';
import PropTypes from 'prop-types';
import Success from '../layout/Success';

const Stock = ({ stock, buyStock, isPurchased, wallet }) => {
  const [formData, setFormData] = useState({
    qty: ''
  });

  //resets isPurchased to false in order to conditionally render success component on buy
  const [purchased, setPurchased] = useState(isPurchased);

  useEffect(() => {
    setPurchased(isPurchased);
  }, [stock, isPurchased]);

  //sets qty of purchase
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //conditional render
  if (purchased === true) {
    return (
      <div className="dashboard-item">
        <div className="dashboard-stock">
          <Success />
        </div>
      </div>
    );
  }

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
            //validates conditional render
            if (formData.qty * stock.latestPrice > wallet) {
              setPurchased(false);
            } else if (formData.qty !== '' || formData.qty > 0) {
              setPurchased(true);
            }
            //sends thunk
            buyStock({ symbol: stock.symbol, qty: formData.qty });
            //resets form
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
