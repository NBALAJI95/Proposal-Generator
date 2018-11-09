import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SavingsComparisonSheet from './FormComponents/Dashboard';
import CashDiscount from './FormComponents/CashDiscount';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

let store = createStore(reducers);

const jsx = (
    <Provider store = {store}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/list" component={SavingsComparisonSheet} />
                <Route path="/cashDiscount" component={CashDiscount} />
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
