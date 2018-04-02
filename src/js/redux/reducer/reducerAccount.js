import * as types from '../type';
import initial from '../initial';

export default function reducerAccount(state = initial.account, action) {
    switch (action.type) {
        case types.ACCOUNT_LOG_IN_SUCCESS:
            return Object.assign({}, state, {
                authenticated: true,
                key: action.user.uid,
                email: action.user.email,
            });
        case types.ACCOUNT_LOG_OUT_SUCCESS:
            return Object.assign({}, state, {
                authenticated: false,
                key: undefined,
                email: undefined,
            });
        case types.ACCOUNT_CHECK_SUCCESS:
            return Object.assign({}, state, {
                initialized: true,
            });
        default:
            return state;
    }
}
