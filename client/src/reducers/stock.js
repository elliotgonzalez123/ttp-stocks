import { GET_STOCK, GET_STOCK_FAIL, CLEAR_STOCK } from '../actions/types';

const initialState = {
  stock: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_STOCK:
      return { ...state, stock: payload };
    case CLEAR_STOCK:
    case GET_STOCK_FAIL:
      return { ...state, stock: null };
    default:
      return state;
  }
}
