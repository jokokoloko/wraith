import initial from '../initial';
import { REQUEST, SUCCESS, FAILURE, CALLS_VOID } from '../type';
import { addStatus, removeStatus } from '../../filter';

export default function reducerCall(state = initial.calls, action) {
    let call = removeStatus(action.type);

    switch (action.type) {
        case addStatus(call, REQUEST):
            return state.concat(call);
        case addStatus(call, SUCCESS):
        case addStatus(call, FAILURE):
            return state.filter((request) => request !== call);
        case CALLS_VOID:
            return initial.calls;
        default:
            return state;
    }
}
