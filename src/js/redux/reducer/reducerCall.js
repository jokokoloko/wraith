import initial from '../initial';
import { CALL_BEGIN, CALL_ERROR, ACCOUNT_CHECK_SUCCESS } from '../type';

const actionTypeEndsInSuccess = (type) => (type === ACCOUNT_CHECK_SUCCESS ? false : type.substring(type.length - 8) === '_SUCCESS');

const reducerCall = (state = initial.call, action) =>
    action.type === CALL_BEGIN ? state + 1 : action.type === CALL_ERROR || actionTypeEndsInSuccess(action.type) ? state - 1 : state;

export default reducerCall;
