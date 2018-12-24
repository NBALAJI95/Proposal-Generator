import { combineReducers } from 'redux';
import NameReducer from './NameReducer';
import CashDiscountReducer from './CashDiscountReducer';

export default combineReducers({
	State: NameReducer,
	CashDiscountState: CashDiscountReducer
});