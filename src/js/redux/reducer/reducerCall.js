import initial from '../initial';
import { CALLS_VOID, USERS_LOAD_REQUEST, USERS_LOAD_SUCCESS, USERS_LOAD_FAILURE } from '../type';

export default function reducerCall(state = initial.calls, action) {
    switch (action.type) {
        case CALLS_VOID:
            return initial.calls;
        case USERS_LOAD_REQUEST:
            return state.concat(USERS_LOAD_REQUEST);
        case USERS_LOAD_SUCCESS:
        case USERS_LOAD_FAILURE:
            return state.filter((request) => request !== USERS_LOAD_REQUEST);
        default:
            return state;
    }
}
