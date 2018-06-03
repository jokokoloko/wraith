import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import immutable from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import combine from './combine';

const configureStore = (initial) =>
    process.env.NODE_ENV === 'production'
        ? createStore(combine, initial, applyMiddleware(thunk))
        : createStore(combine, initial, composeWithDevTools(applyMiddleware(thunk, immutable())));

export default configureStore;
