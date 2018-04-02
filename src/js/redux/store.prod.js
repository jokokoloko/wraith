import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combine from './combine';

export default function configureStore(initial) {
    return createStore(
        combine,
        initial,
        applyMiddleware(thunk),
    );
}
