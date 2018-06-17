import { combineReducers } from 'redux';
import account from './reducer/reducerAccount';
import profile from './reducer/reducerProfile';
import calls from './reducer/reducerCall';
import users from './reducer/reducerUser';
import champions from './reducer/reducerChampion';
import composition from './reducer/reducerComposition';

export default combineReducers({
    account,
    profile,
    calls,
    users,
    champions,
    composition,
});
