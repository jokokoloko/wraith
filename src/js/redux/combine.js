import { combineReducers } from 'redux';
import call from './reducer/reducerCall';
import account from './reducer/reducerAccount';

const combine = combineReducers({
    call,
    account,
});

export default combine;
