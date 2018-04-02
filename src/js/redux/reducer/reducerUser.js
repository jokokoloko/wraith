import * as types from '../type';
import initial from '../initial';

export default function reducerUser(state = initial.users, action) {
    switch (action.type) {
        case types.USER_ADD_SUCCESS:
            return [...state, Object.assign({}, action.user)];
        case types.USERS_LOAD_SUCCESS:
            return action.users;
        default:
            return state;
    }
}
