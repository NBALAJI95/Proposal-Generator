import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

let store = createStore(reducers);

const jsx = (
    <Provider store = {store}>
        <App />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
