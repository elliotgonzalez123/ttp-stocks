import axios from 'axios';
import { GET_TRANSACTIONS, BUY_STOCK } from './types';
import { getLivePortfolio } from './portfolio';
import { loadUser } from './auth';
import { setAlert } from './alert';

export const getAllTransactions = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/transactions');
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
    const { data } = await axios.post('/api/transactions', body, config);
    dispatch({
      type: BUY_STOCK,
      payload: data
    });
    dispatch(getLivePortfolio());
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
