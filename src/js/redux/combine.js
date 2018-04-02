import { combineReducers } from 'redux';
import ajax from './reducer/reducerAjax';
import account from './reducer/reducerAccount';
import users from './reducer/reducerUser';
import posts from './reducer/reducerPost';
import reviews from './reducer/reducerReview';

const combine = combineReducers({
    ajax,
    account,
    users,
    posts,
    reviews,
});

export default combine;
