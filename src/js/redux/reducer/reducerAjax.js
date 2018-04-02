import * as types from '../type';
import initial from '../initial';

function actionTypeEndsInSuccess(type) {
    if (type === types.ACCOUNT_CHECK_SUCCESS) return false;
    return type.substring(type.length - 8) === '_SUCCESS';
}

export default function reducerAjax(state = initial.ajax, action) {
    if (action.type === types.AJAX_CALL_BEGIN) {
        return state + 1;
    } else if (action.type === types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }
    return state;
}
