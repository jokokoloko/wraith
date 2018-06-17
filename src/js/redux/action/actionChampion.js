import toastr from 'toastr';
import apiChampion from '../../../api/apiChampion';
import { champions } from '../../../api/firebase';
import {
    CHAMPIONS_LOAD_REQUEST,
    CHAMPIONS_LOAD_SUCCESS,
    CHAMPIONS_LOAD_FAILURE,
    CHAMPIONS_WATCH_REQUEST,
    CHAMPIONS_WATCH_SUCCESS,
    CHAMPIONS_WATCH_FAILURE,
    CHAMPIONS_VOID,
} from '../type';

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

// Watch
export const championsWatchRequest = () => ({
    type: CHAMPIONS_WATCH_REQUEST,
});

export const championsWatchSuccess = (champions) => ({
    type: CHAMPIONS_WATCH_SUCCESS,
    champions,
});

export const championsWatchFailure = (error) => ({
    type: CHAMPIONS_WATCH_FAILURE,
    error,
});

export const championsWatch = () => (dispatch) => {
    dispatch(championsWatchRequest());
    return champions.onSnapshot(
        (snapshot) => {
            const champions = snapshot.docs.map((champion) => (champion.data()));
            dispatch(championsWatchSuccess(champions));
        },
        (error) => {
            dispatch(championsWatchFailure(error));
            toastr.error(error.message);
            throw error;
        },
    );
};

// Void
export const championsVoid = () => ({
    type: CHAMPIONS_VOID,
});
