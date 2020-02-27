import { GET_TRANSACTIONS, BUY_STOCK } from '../actions/types';

const initialState = {
  transactions: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TRANSACTIONS:
      return { ...state, transactions: payload };
    case BUY_STOCK:
      return { ...state, transactions: payload.transactions };
    default:
      return state;
  }
}
