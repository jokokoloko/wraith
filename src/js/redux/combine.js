import { combineReducers } from 'redux';
import account from './reducer/reducerAccount';
import profile from './reducer/reducerProfile';
import view from './reducer/reducerView';
import calls from './reducer/reducerCall';
import users from './reducer/reducerUser';
import posts from './reducer/reducerPost';
import champions from './reducer/reducerChampion';
import compositions from './reducer/reducerComposition';
import wildcards from './reducer/reducerWildcard';

export default combineReducers({
    account,
    profile,
    view,
    calls,
    users,
    posts,
    champions,
    compositions,
    wildcards,
});
