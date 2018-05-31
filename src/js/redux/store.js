import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import combine from './combine';

const configureStore = (initial) =>
    process.env.NODE_ENV === 'production'
        ? createStore(combine, initial, applyMiddleware(thunk))
        : createStore(combine, initial, composeWithDevTools(
        	applyMiddleware(thunk, reduxImmutableStateInvariant())
    	));

export default configureStore;
