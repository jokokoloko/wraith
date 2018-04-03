import toastr from 'toastr';
import { ajaxCallBegin, ajaxCallError } from './actionAjax';
import { REVIEW_ADD_SUCCESS, REVIEW_EDIT_SUCCESS, REVIEWS_LOAD_SUCCESS } from '../type';
import apiReview from '../../../api/apiReview';

// Save
export const reviewAddSuccess = (review) => ({
    type: REVIEW_ADD_SUCCESS,
    review,
});

export const reviewEditSuccess = (review) => ({
    type: REVIEW_EDIT_SUCCESS,
    review,
});

export const reviewSave = (review) => (dispatch) => {
    dispatch(ajaxCallBegin()); // used to display a preloader before calls (optional)
    toastr.warning('Saving Review...'); // possibly remove
    return apiReview
        .reviewSave(review)
        .then((reviewSaved) => {
            // function from API (requires return)
            if (review.key) {
                dispatch(reviewEditSuccess(reviewSaved));
                toastr.success('Review updated!');
            } else {
                dispatch(reviewAddSuccess(reviewSaved));
                toastr.success('Review published!');
            }
        })
        .catch((error) => {
            dispatch(ajaxCallError(error));
            toastr.error(error.message);
            throw error;
        });
};

// Load
export const reviewsLoadSuccess = (reviews) => ({
    type: REVIEWS_LOAD_SUCCESS,
    reviews,
});

export const reviewsLoad = () =>
    // used in index.js
    (dispatch) => {
        dispatch(ajaxCallBegin()); // used to display a preloader before calls (optional)
        return apiReview
            .reviewsLoad()
            .then((reviews) => {
                // function from API (requires return)
                dispatch(reviewsLoadSuccess(reviews));
            })
            .catch((error) => {
                dispatch(ajaxCallError(error));
                toastr.error(error.message);
                throw error;
            });
    };
