import initial from '../initial';
import {
    CALLS_VOID,
    REQUEST,
    SUCCESS,
    FAILURE,
} from '../type';

export default function reducerCall(state = initial.calls, action) {
    let type = action.type.substring(0, action.type.length-8);
    let typeResponse = action.type.substr(-8);

    if (type === CALLS_VOID) {
        return initial.calls;
    } else if (typeResponse === REQUEST) {
        return state.concat(type);
    } else if (typeResponse === SUCCESS || typeResponse === FAILURE) {
        return state.filter((request) => request !== type);
    } else {
        return state;
    }
}
