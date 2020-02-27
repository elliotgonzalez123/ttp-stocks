import axios from 'axios';
import { GET_TRANSACTIONS } from './types';

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
