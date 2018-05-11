import { combineReducers } from 'redux';
import account from './reducer/reducerAccount';
import profile from './reducer/reducerProfile';
import users from './reducer/reducerUser';

const combine = combineReducers({
    account,
    profile,
    users,
});

export default combine;
