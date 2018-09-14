import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import SavingsComparisonSheet from './FormComponents/Dashboard';
import registerServiceWorker from './registerServiceWorker';
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
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
