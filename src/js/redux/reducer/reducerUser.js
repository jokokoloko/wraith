import initial from '../initial';
import { USER_ADD_SUCCESS, USERS_LOAD_SUCCESS, USERS_WATCH_SUCCESS } from '../type';

export default function reducerUser(state = initial.users, action) {
    switch (action.type) {
        case USER_ADD_SUCCESS:
            return [...state, Object.assign({}, action.user)];
        case USERS_LOAD_SUCCESS:
        case USERS_WATCH_SUCCESS:
            return action.users;
        default:
            return state;
    }
}
