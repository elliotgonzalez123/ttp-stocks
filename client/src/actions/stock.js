import axios from 'axios';
import { GET_STOCK, GET_STOCK_FAIL } from './types';
import { setAlert } from './alert';

export const getStock = stockObj => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(stockObj);
  console.log(body);
  try {
    const { data } = await axios.post(
      'http://localhost:5000/api/stock',
      body,
      config
    );
    dispatch({
      type: GET_STOCK,
      payload: data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors.msg);
    if (errors) {
      dispatch(setAlert(errors.msg, 'danger'));
    }
    dispatch({
      type: GET_STOCK_FAIL
    });
  }
};
