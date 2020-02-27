import { GET_LIVE_PORTFOLIO } from '../actions/types';

const initialState = {
  portfolio: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LIVE_PORTFOLIO:
      return { ...state, portfolio: payload };
    default:
      return state;
  }
}