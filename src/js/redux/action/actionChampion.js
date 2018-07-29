import toastr from 'toastr';
import apiChampion from '../../../api/apiChampion';
import { CHAMPIONS_LOAD_REQUEST, CHAMPIONS_LOAD_SUCCESS, CHAMPIONS_LOAD_FAILURE, CHAMPIONS_VOID } from '../type';

toastr.options.positionClass = 'toast-top-center';

// Load
export const championsLoadRequest = () => ({
    type: CHAMPIONS_LOAD_REQUEST,
});

export const championsLoadSuccess = (champions) => ({
    type: CHAMPIONS_LOAD_SUCCESS,
    champions,
});

export const championsLoadFailure = (error) => ({
    type: CHAMPIONS_LOAD_FAILURE,
    error,
});

export const championsLoad = () => (dispatch) => {
    dispatch(championsLoadRequest());
    return apiChampion
        .championsLoad()
        .then((champions) => dispatch(championsLoadSuccess(champions)))
        .catch((error) => {
            dispatch(championsLoadFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Void
export const championsVoid = () => ({
    type: CHAMPIONS_VOID,
});
