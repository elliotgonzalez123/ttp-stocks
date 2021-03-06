import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Portfolio from './Portfolio';
import Search from './Search';
import Stock from './Stock';
import { getStock } from '../../actions/stock';
import userIcon from '../../img/user_icon.svg';

const Dashboard = ({ auth: { user }, getStock, stock: { stock } }) => {
  if (!user) {
    return <h1>loading...</h1>;
  }

  //connects from search component to load stock into state and pass it to the stock render component
  const onSearchSubmit = stockInfo => {
    getStock(stockInfo);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <div className="dashboard-item">
          <div className="dashboard-card-header">
            <h1 style={{ color: '#F49E2F' }}>Welcome, {user.name}!</h1>
            <i
              className="fas fa-chart-line fa-2x"
              style={{ color: '#8136E9' }}
            ></i>
          </div>
          <div className="dashboard-card-body">
            <div style={{ marginLeft: '20px' }}>
              <img src={userIcon} alt="user-icon" />
            </div>
            <div style={{ width: '200px' }}>
              <h2>{user.name}</h2>
              <h4>{user.email}</h4>
              <div className="dashboard-card-balance">
                <h4 style={{ color: 'white' }}>Account Balance:</h4>
                <h1 style={{ color: 'white' }}>
                  ${Math.round((user.wallet + Number.EPSILON) * 100) / 100}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-item">
          <Portfolio onSearchSubmit={onSearchSubmit} />
        </div>
      </div>
      <div className="dashboard-right">
        <div className="dashboard-item">
          <Search onSearchSubmit={onSearchSubmit} />
        </div>
        {/* conditionally rendering stock component based on what thunk gets back */}
        {stock ? (
          <Stock stock={stock} isPurchased={false} wallet={user.wallet} />
        ) : (
          <div />
        )}
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
