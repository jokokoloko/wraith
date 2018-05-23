import toastr from 'toastr';
import apiUser from '../../../api/apiUser';
import {
    USERS_LOAD_REQUEST,
    USERS_LOAD_SUCCESS,
    USERS_LOAD_FAILURE,
    USERS_WATCH_SUCCESS,
    USERS_WATCH_ERROR,
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

export const usersWatchSuccess = (users) => ({
    type: USERS_WATCH_SUCCESS,
    users,
});

export const usersWatchError = (error) => ({
    type: USERS_WATCH_ERROR,
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

export const usersWatch = () => (dispatch) => {
    return apiUser.usersWatch(dispatch);
};

export const usersWatchDispatch = (users) => (dispatch) => {
    dispatch(usersWatchSuccess(users));
};

// Void
export const usersVoid = () => ({
    type: USERS_VOID,
});
