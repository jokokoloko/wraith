import toastr from 'toastr';
import { callBegin, callError } from './actionCall';
import { USER_ADD_SUCCESS, USERS_LOAD_SUCCESS, USERS_WATCH_SUCCESS } from '../type';
import apiUser from '../../../api/apiUser';

// Save
export const userAddSuccess = (user) => ({
    type: USER_ADD_SUCCESS,
    user,
});

// Load
export const usersLoadSuccess = (users) => ({
    type: USERS_LOAD_SUCCESS,
    users,
});

export const usersLoad = () => (dispatch) => {
    dispatch(callBegin());
    return apiUser
        .usersLoad()
        .then((users) => dispatch(usersLoadSuccess(users)))
        .catch((error) => {
            dispatch(callError(error));
            toastr.error(error.message);
            throw error;
        });
};

// Watch
export const usersWatchSuccess = (users) => ({
    type: USERS_WATCH_SUCCESS,
    users,
});

export const usersWatch = () => (dispatch) => {
    dispatch(callBegin());
    return apiUser.usersWatch((users) =>
        dispatch(usersWatchSuccess(users), (error) => {
            dispatch(callError(error));
            toastr.error(error.message);
            throw error;
        }),
    );
};
