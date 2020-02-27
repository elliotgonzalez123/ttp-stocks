import axios from 'axios';
import { GET_LIVE_PORTFOLIO } from './types';

export const getLivePortfolio = () => async dispatch => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/portfolio');
    dispatch({
      type: GET_LIVE_PORTFOLIO,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};
