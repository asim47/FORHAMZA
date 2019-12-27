
import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';
import { Router } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./store/reducer";
import thunk from "redux-thunk";

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory()

const store = createStore(reducer, compose(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Router history={history}>
        <Provider store={store} >
            <App />
        </Provider>
    </Router>, document.getElementById("app"))
