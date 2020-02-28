import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllTransactions } from '../../actions/transactions';

const Transactions = ({
  getAllTransactions,
  transactions: { transactions }
}) => {
  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);
  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {transactions.map(item => (
          <li key={item.id}>
            {item.symbol} - $
            {Math.round((item.price + Number.EPSILON) * 100) / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};
const mapStateToProps = state => ({
  transactions: state.transactions
});

export default connect(mapStateToProps, { getAllTransactions })(Transactions);
