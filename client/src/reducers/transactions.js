import { GET_TRANSACTIONS } from '../actions/types';

const initialState = {
  transactions: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TRANSACTIONS:
      return { ...state, transactions: payload };
    default:
      return state;
  }
}
