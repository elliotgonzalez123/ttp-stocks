import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLivePortfolio } from '../../actions/portfolio';

const Portfolio = ({ getLivePortfolio, portfolio: { portfolio } }) => {
  useEffect(() => {
    getLivePortfolio();
  }, [getLivePortfolio]);
  return (
    <div>
      <h1>Portfolio</h1>
      <ul>
        {portfolio &&
          portfolio.map(item => (
            <li key={item.id}>
              {item.symbol} - {item.price}
            </li>
          ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

export default connect(mapStateToProps, { getLivePortfolio })(Portfolio);
