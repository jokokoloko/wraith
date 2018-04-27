import initial from '../initial';
import { CALL_BEGIN, CALL_ERROR, ACCOUNT_CHECK_SUCCESS } from '../type';

function actionTypeEndsInSuccess(type) {
    if (type === ACCOUNT_CHECK_SUCCESS) return false;
    return type.substring(type.length - 8) === '_SUCCESS';
}

export default function reducerCall(state = initial.call, action) {
    if (action.type === CALL_BEGIN) {
        return state + 1;
    } else if (action.type === CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }
    return state;
}
