import { combineReducers } from 'redux';
import call from './reducer/reducerCall';
import account from './reducer/reducerAccount';
import profile from './reducer/reducerProfile';
import users from './reducer/reducerUser';

const combine = combineReducers({
    call,
    account,
    profile,
    users,
});

export default combine;
