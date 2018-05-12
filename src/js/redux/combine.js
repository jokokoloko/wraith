import { combineReducers } from 'redux';
import { USERS_LOAD_REQUEST, USERS_LOAD_SUCCESS, USERS_LOAD_FAILURE } from './type';
import initial from './initial';
import account from './reducer/reducerAccount';
import profile from './reducer/reducerProfile';
import users from './reducer/reducerUser';

function calls(state = initial.calls, action) {
    switch (action.type) {
        case USERS_LOAD_REQUEST:
            return state.concat([USERS_LOAD_REQUEST]);
        case USERS_LOAD_SUCCESS:
        case USERS_LOAD_FAILURE:
            return state.filter((request) => request !== USERS_LOAD_REQUEST);
        default:
            return state;
    }
}

const combine = combineReducers({
    account,
    profile,
    calls,
    users,
});

export default combine;
