import toastr from 'toastr';
import apiUser from '../../../api/apiUser';
import {
    USERS_LOAD_REQUEST,
    USERS_LOAD_SUCCESS,
    USERS_LOAD_FAILURE,
    USERS_WATCH_REQUEST,
    USERS_WATCH_SUCCESS,
    USERS_WATCH_FAILURE,
    USERS_VOID,
} from '../type';

toastr.options.positionClass = 'toast-top-center';

// Load
export const usersLoadRequest = () => ({
    type: USERS_LOAD_REQUEST,
});

export const usersLoadSuccess = (users) => ({
    type: USERS_LOAD_SUCCESS,
    users,
});

export const usersLoadFailure = (error) => ({
    type: USERS_LOAD_FAILURE,
    error,
});

export const usersLoad = (open) => (dispatch) => {
    dispatch(usersLoadRequest());
    return apiUser
        .usersLoad(open)
        .then((users) => dispatch(usersLoadSuccess(users)))
        .catch((error) => {
            dispatch(usersLoadFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Watch
export const usersWatchRequest = () => ({
    type: USERS_WATCH_REQUEST,
});

export const usersWatchSuccess = (users) => ({
    type: USERS_WATCH_SUCCESS,
    users,
});

export const usersWatchFailure = (error) => ({
    type: USERS_WATCH_FAILURE,
    error,
});

export const usersWatch = () => (dispatch) => {
    dispatch(usersWatchRequest());
    return apiUser.usersWatch(dispatch);
};

// Void
export const usersVoid = () => ({
    type: USERS_VOID,
});
