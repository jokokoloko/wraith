import initial from '../initial';
import { PROFILE_LOAD_SUCCESS, PROFILE_VOID } from '../type';

export default function reducerProfile(state = initial.profile, action) {
    switch (action.type) {
        case PROFILE_LOAD_SUCCESS:
            return action.profile;
        case PROFILE_VOID:
            return initial.profile;
        default:
            return state;
    }
}
