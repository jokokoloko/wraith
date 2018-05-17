import initial from '../initial';
import { USERS_LOAD_SUCCESS, USERS_WATCH_SUCCESS, USERS_VOID } from '../type';

export default function reducerUser(state = initial.users, action) {
    switch (action.type) {
        case USERS_LOAD_SUCCESS:
        case USERS_WATCH_SUCCESS:
            return action.users;
        case USERS_VOID:
            return initial.users;
        default:
            return state;
    }
}
