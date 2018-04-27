import { combineReducers } from 'redux';
import ajax from './reducer/reducerAjax';
import account from './reducer/reducerAccount';

const combine = combineReducers({
    ajax,
    account,
});

export default combine;
