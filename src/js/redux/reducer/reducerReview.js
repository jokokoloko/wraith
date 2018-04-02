import * as types from '../type';
import initial from '../initial';

export default function reducerReview(state = initial.reviews, action) {
    switch (action.type) {
        case types.REVIEW_ADD_SUCCESS:
            return Object.assign({}, state, {
                [action.review.post]: [...(state[action.review.post] || []), Object.assign({}, action.review)],
            });
        case types.REVIEWS_LOAD_SUCCESS:
            return action.reviews;
        default:
            return state;
    }
}
