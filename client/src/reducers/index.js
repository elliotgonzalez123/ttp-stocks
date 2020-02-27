import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import portfolio from './portfolio';
import transactions from './transactions';
import stock from './stock';
export default combineReducers({ alert, auth, portfolio, transactions, stock });
