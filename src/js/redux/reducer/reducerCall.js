import initial from '../initial';
import { REQUEST, SUCCESS, FAILURE, CALLS_VOID } from '../type';
import { checkStatus, removeStatus } from '../../filter';

export default function reducerCall(state = initial.calls, action) {
    const type = action.type === CALLS_VOID ? CALLS_VOID : checkStatus(action.type);
    const call = removeStatus(action.type);

    console.log('Status:', type, call); // remove

    switch (type) {
        case REQUEST:
            return state.concat(call);
        case SUCCESS:
        case FAILURE:
            return state.filter((request) => request !== call);
        case CALLS_VOID:
            console.log('Bingo!'); // remove
            return initial.calls;
        default:
            return state;
    }
}
