import initial from '../initial';
import {
    CALLS_VOID,
    PROFILE_LOAD_REQUEST,
    PROFILE_LOAD_SUCCESS,
    PROFILE_LOAD_FAILURE,
    USERS_LOAD_REQUEST,
    USERS_LOAD_SUCCESS,
    USERS_LOAD_FAILURE,
} from '../type';

export default function reducerCall(state = initial.calls, action) {
    switch (action.type) {
        case CALLS_VOID:
            return initial.calls;
        case PROFILE_LOAD_REQUEST:
            return state.concat(PROFILE_LOAD_REQUEST);
        case PROFILE_LOAD_SUCCESS:
        case PROFILE_LOAD_FAILURE:
            return state.filter((request) => request !== PROFILE_LOAD_REQUEST);
        case USERS_LOAD_REQUEST:
            return state.concat(USERS_LOAD_REQUEST);
        case USERS_LOAD_SUCCESS:
        case USERS_LOAD_FAILURE:
            return state.filter((request) => request !== USERS_LOAD_REQUEST);
        default:
            return state;
    }
}
