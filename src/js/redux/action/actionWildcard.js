import toastr from 'toastr';
import apiWildcard from '../../../api/apiWildcard';
import { WILDCARDS_LOAD_REQUEST, WILDCARDS_LOAD_SUCCESS, WILDCARDS_LOAD_FAILURE, WILDCARDS_VOID } from '../type';

toastr.options.positionClass = 'toast-top-center';

// Load
export const wildcardsLoadRequest = () => ({
    type: WILDCARDS_LOAD_REQUEST,
});

export const wildcardsLoadSuccess = (wildcards) => ({
    type: WILDCARDS_LOAD_SUCCESS,
    wildcards,
});

export const wildcardsLoadFailure = (error) => ({
    type: WILDCARDS_LOAD_FAILURE,
    error,
});

export const wildcardsLoad = () => (dispatch) => {
    dispatch(wildcardsLoadRequest());
    return apiWildcard
        .wildcardsLoad()
        .then((wildcards) => dispatch(wildcardsLoadSuccess(wildcards)))
        .catch((error) => {
            dispatch(wildcardsLoadFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Void
export const wildcardsVoid = () => ({
    type: WILDCARDS_VOID,
});
