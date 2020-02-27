import axios from 'axios';
import { GET_TRANSACTIONS, BUY_STOCK } from './types';

export const getAllTransactions = () => async dispatch => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/transactions');
    dispatch({
      type: GET_TRANSACTIONS,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

export const buyStock = stockObj => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(stockObj);
  try {
    const { data } = await axios.post(
      'http://localhost:5000/api/transactions',
      body,
      config
    );
    dispatch({
      type: BUY_STOCK,
      payload: data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    // if (errors) {
    //   dispatch(setAlert(errors.msg, 'danger'));
    // }
    // dispatch({
    //   type: GET_STOCK_FAIL
    // });
  }
};
