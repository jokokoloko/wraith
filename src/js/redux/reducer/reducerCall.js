import initial from '../initial';
import { REQUEST, SUCCESS, FAILURE, CALLS_VOID } from '../type';
import { checkStatus, removeStatus } from '../../filter';

export default function reducerCall(state = initial.calls, action) {
    let status = checkStatus(action.type);
    let call = removeStatus(action.type);

    if (action.type === CALLS_VOID) {
        return initial.calls;
    } else if (status === REQUEST) {
        return state.concat(call);
    } else if (status === SUCCESS || status === FAILURE) {
        return state.filter((request) => request !== call);
    } else {
        return state;
    }
}
