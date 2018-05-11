import initial from '../initial';
import { USERS_LOAD_SUCCESS } from '../type';

export default function reducerUser(state = initial.users, action) {
    switch (action.type) {
        case USERS_LOAD_SUCCESS:
            return action.users;
        default:
            return state;
    }
}
