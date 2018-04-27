import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import combine from './combine';

const configureStore = (initial) =>
    process.env.NODE_ENV === 'production'
        ? createStore(combine, initial, applyMiddleware(thunk))
        : createStore(combine, initial, applyMiddleware(thunk, reduxImmutableStateInvariant()));

export default configureStore;
