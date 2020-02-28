import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllTransactions } from '../../actions/transactions';
import Moment from 'react-moment';

const Transactions = ({
  getAllTransactions,
  transactions: { transactions }
}) => {
  //mounts transaction data via thunk on mount
  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  return (
    <div>
      <h1 style={{ color: '#F49E2F' }}>Transactions</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Stocks</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(item => (
            <tr key={item._id}>
              <td>{item.symbol}</td>
              <td>{Math.round((item.price + Number.EPSILON) * 100) / 100}</td>
              <td>{item.qty}</td>
              <td>
                <Moment>{item.date}</Moment>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = state => ({
  transactions: state.transactions
});

export default connect(mapStateToProps, { getAllTransactions })(Transactions);
