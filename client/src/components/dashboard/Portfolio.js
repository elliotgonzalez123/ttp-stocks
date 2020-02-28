import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLivePortfolio } from '../../actions/portfolio';
import { getAllTransactions } from '../../actions/transactions';

const Portfolio = ({
  getLivePortfolio,
  portfolio: { portfolio, loading },
  transactions,
  getAllTransactions
}) => {
  useEffect(() => {
    getLivePortfolio();
    getAllTransactions();
  }, [getLivePortfolio, getAllTransactions]);

  if (typeof transactions === 'string') {
    return <div>Buy some stocks!</div>;
  }

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <div className="dashboard-card-header">
        <h1 style={{ color: '#F49E2F' }}>Portfolio</h1>
        <i
          className="fas fa-folder-open fa-2x"
          style={{ color: '#8136E9' }}
        ></i>
      </div>
      <div className="dashboard-card-body">
        <ul>
          {portfolio.map(item => (
            <li key={item.id}>
              <span
                style={{
                  backgroundColor: `${item.color}`,
                  color: 'white',
                  borderRadius: '5px',
                  padding: '5px',
                  fontWeight: '600',
                  margin: '2px'
                }}
              >
                {item.symbol}{' '}
              </span>{' '}
              <span className="stock-qty">{item.qty} shares</span>{' '}
              <span style={{ float: 'right', fontWeight: '600' }}>
                ${Math.round((item.price + Number.EPSILON) * 100) / 100}{' '}
                {item.color === 'green' ? (
                  <i className="fas fa-arrow-up" style={{ color: 'green' }}></i>
                ) : (
                  <i className="fas fa-arrow-down" style={{ color: 'red' }}></i>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  portfolio: state.portfolio,
  transactions: state.transactions.transactions
});

export default connect(mapStateToProps, {
  getLivePortfolio,
  getAllTransactions
})(Portfolio);
