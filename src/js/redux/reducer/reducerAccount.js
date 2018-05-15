import initial from '../initial';
import { ACCOUNT_ON, ACCOUNT_OFF, ACCOUNT_CHECK_SUCCESS } from '../type';

export default function reducerAccount(state = initial.account, action) {
    switch (action.type) {
        case ACCOUNT_ON:
            return Object.assign({}, state, {
                authenticated: true,
            });
        case ACCOUNT_OFF:
            return Object.assign({}, state, {
                authenticated: false,
            });
        case ACCOUNT_CHECK_SUCCESS:
            return Object.assign({}, state, {
                initialized: true,
            });
        default:
            return state;
    }
}
