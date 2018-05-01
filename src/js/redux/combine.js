import { combineReducers } from 'redux';
import call from './reducer/reducerCall';
import account from './reducer/reducerAccount';
import users from './reducer/reducerUser';

const combine = combineReducers({
    call,
    account,
    users,
});

export default combine;
