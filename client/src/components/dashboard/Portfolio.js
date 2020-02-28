import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLivePortfolio } from '../../actions/portfolio';

const Portfolio = ({ getLivePortfolio, portfolio: { portfolio, loading } }) => {
  useEffect(() => {
    getLivePortfolio();
  }, [getLivePortfolio]);

  if (loading) {
    return <div>Loading....</div>;
  }

  // if (portfolio.length === 0) {
  //   return <div>Buy some stocks!</div>;
  // }
  return (
    <>
      <div className="dashboard-card-header">
        <h1>Portfolio</h1>
      </div>
      <div className="dashboard-card-body">
        <ul>
          {portfolio.map(item => (
            <li key={item.id}>
              {item.symbol} -{' '}
              {Math.round((item.price + Number.EPSILON) * 100) / 100}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

export default connect(mapStateToProps, { getLivePortfolio })(Portfolio);
