import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Portfolio from './Portfolio';
import Search from './Search';
import Stock from './Stock';
import { getStock } from '../../actions/stock';

const Dashboard = ({ auth: { user }, getStock, stock: { stock } }) => {
  if (!user) {
    return <h1>loading...</h1>;
  }

  const onSearchSubmit = stockInfo => {
    getStock(stockInfo);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <div className="dashboard-item">
          <h1>Welcome {user.name}</h1>
          <h4>{user.email}</h4>
          <h3>Balance: ${user.wallet}</h3>
        </div>
        <div className="dashboard-item">
          {/* <Portfolio /> */}
          <h1>Portfolio</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Condimentum lacinia quis vel eros donec ac odio. Tempus quam
            pellentesque nec nam.
          </p>
        </div>
      </div>
      <div className="dashboard-right">
        <div className="dashboard-item">
          <Search onSearchSubmit={onSearchSubmit} />
        </div>
        {stock ? <Stock /> : <div />}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  stock: PropTypes.object.isRequired,
  getStock: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  stock: state.stock
});

export default connect(mapStateToProps, { getStock })(Dashboard);
