import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combine from './combine';

const configureStore = (initial) => createStore(combine, initial, applyMiddleware(thunk));

export default configureStore;
