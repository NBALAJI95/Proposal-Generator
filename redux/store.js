import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import { Name, CashDiscount } from "./reducers/InitialState";

const exampleInitialState = {
  State: { partA: Name, partB: Name},
  CashDiscountState: {
    partA: {
      volume: '',
      Fees: '',
      additionalFees: {},
      modalFees: ''
    },
    partB: {
      volume: '',
      Fees: '',
      additionalFees: {},
      modalFees: ''
    },
    overview: false,
    volume: '',
    businessName: '',
    currentProvider: '',
    avgTicket: '',
    transactions: '',
    serviceFeePercent: '',
    additional: new Set()
  }
};

export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
