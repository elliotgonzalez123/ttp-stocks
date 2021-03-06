import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLivePortfolio } from '../../actions/portfolio';
import { getAllTransactions } from '../../actions/transactions';
import Spinner from '../layout/Spinner';

const Portfolio = ({
  getLivePortfolio,
  portfolio: { portfolio, loading },
  transactions,
  getAllTransactions,
  onSearchSubmit
}) => {
  //mounts thunk for live portfolio and also pulls all transactions to conditionally render portfolio to avoid infinite spinner
  //when a user has no transactions
  useEffect(() => {
    getLivePortfolio();
    getAllTransactions();
  }, [getLivePortfolio, getAllTransactions]);

  //checks if server response is a string... api returns a string when transactions are empty
  if (typeof transactions === 'string') {
    return <div>Buy some stocks!</div>;
  }

  //spinner on load
  if (loading) {
    return <Spinner />;
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
      <div className="dashboard-card-header">
        <p>
          Stocks shown in green are up from yesterdays closing price, red
          denotes they are down. Click each stock to see the latest stock
          information.
        </p>
      </div>
      <div className="dashboard-card-body">
        {/* ul for live portfolio, elements are in each li via spans with custom inline styles, done for brevity */}
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
                  margin: '2px',
                  cursor: 'pointer'
                }}
                onClick={e => {
                  onSearchSubmit({ symbol: `${item.symbol}` });
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
