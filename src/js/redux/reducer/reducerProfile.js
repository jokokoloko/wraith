import initial from '../initial';
import { PROFILE_LOAD_SUCCESS } from '../type';

export default function reducerProfile(state = initial.profile, action) {
    switch (action.type) {
        case PROFILE_LOAD_SUCCESS:
            return action.profile;
        default:
            return state;
    }
}
