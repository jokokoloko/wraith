import initial from '../initial';
import { ACCOUNT_LOG_IN_SUCCESS, ACCOUNT_LOG_OUT_SUCCESS, ACCOUNT_CHECK_SUCCESS } from '../type';

export default function reducerAccount(state = initial.account, action) {
    switch (action.type) {
        case ACCOUNT_LOG_IN_SUCCESS:
            return Object.assign({}, state, {
                authenticated: true,
                uid: action.user.uid,
                email: action.user.email,
            });
        case ACCOUNT_LOG_OUT_SUCCESS:
            return Object.assign({}, state, {
                authenticated: false,
                uid: undefined,
                email: undefined,
            });
        case ACCOUNT_CHECK_SUCCESS:
            return Object.assign({}, state, {
                initialized: true,
            });
        default:
            return state;
    }
}
