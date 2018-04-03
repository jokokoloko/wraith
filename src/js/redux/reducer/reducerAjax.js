import initial from '../initial';
import { AJAX_CALL_BEGIN, AJAX_CALL_ERROR, ACCOUNT_CHECK_SUCCESS } from '../type';

function actionTypeEndsInSuccess(type) {
    if (type === ACCOUNT_CHECK_SUCCESS) return false;
    return type.substring(type.length - 8) === '_SUCCESS';
}

export default function reducerAjax(state = initial.ajax, action) {
    if (action.type === AJAX_CALL_BEGIN) {
        return state + 1;
    } else if (action.type === AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }
    return state;
}
