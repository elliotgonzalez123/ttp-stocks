import { GET_LIVE_PORTFOLIO, CLEAR_PORTFOLIO } from '../actions/types';

const initialState = {
  portfolio: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LIVE_PORTFOLIO:
      return { ...state, portfolio: payload, loading: false };
    case CLEAR_PORTFOLIO:
      return { ...state, portfolio: null, loading: true };
    default:
      return state;
  }
}
