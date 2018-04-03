import initial from '../initial';
import { REVIEW_ADD_SUCCESS, REVIEWS_LOAD_SUCCESS } from '../type';

export default function reducerReview(state = initial.reviews, action) {
    switch (action.type) {
        case REVIEW_ADD_SUCCESS:
            return Object.assign({}, state, {
                [action.review.post]: [...(state[action.review.post] || []), Object.assign({}, action.review)],
            });
        case REVIEWS_LOAD_SUCCESS:
            return action.reviews;
        default:
            return state;
    }
}
