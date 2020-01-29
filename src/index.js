import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import service from './service';
import Root from './js/react/Root';
import configureStore from './js/redux/store';
import { championsLoad } from './js/redux/action/actionChampion';
import { wildcardsLoad } from './js/redux/action/actionWildcard';
import '../node_modules/toastr/build/toastr.min.css'; // 6 kb
import './css/theme.css';
import RootContext from './js/root-context';

const store = configureStore();
store.dispatch(championsLoad());
store.dispatch(wildcardsLoad());

ReactDOM.render(
    <Provider store={store}>
        <RootContext>
            <Root />
        </RootContext>
    </Provider>,
    document.getElementById('root'),
);
service();
