import toastr from 'toastr';
import { ajaxCallBegin, ajaxCallError } from './actionAjax';
import { ACCOUNT_LOG_IN_SUCCESS, ACCOUNT_LOG_OUT_SUCCESS, ACCOUNT_CHECK_SUCCESS } from '../type';
import apiAccount from '../../../api/apiAccount';

// Check
export const accountLogInSuccess = (user) => ({
    type: ACCOUNT_LOG_IN_SUCCESS,
    user,
});

export const accountLogOutSuccess = () => ({
    type: ACCOUNT_LOG_OUT_SUCCESS,
});

export const accountCheckSuccess = () => ({
    type: ACCOUNT_CHECK_SUCCESS,
});

export const accountCheck = () => (dispatch) => {
    dispatch(ajaxCallBegin());
    return apiAccount
        .accountCheck()
        .then((user) => {
            user ? dispatch(accountLogInSuccess(user)) : dispatch(accountLogOutSuccess());
            user && toastr.success(`Welcome ${user.email}!`);
            dispatch(accountCheckSuccess());
        })
        .catch((error) => {
            dispatch(ajaxCallError(error));
            toastr.error(error.message);
            throw error;
        });
};

// Register
export const accountRegister = (user) => (dispatch) => {
    toastr.warning('Registering...'); // possibly remove
    return apiAccount
        .accountRegister(user)
        .then(() => dispatch(accountCheck()))
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });
};

// Log In
export const accountLogIn = (user) => (dispatch) => {
    toastr.warning('Logging in...'); // possibly remove
    return apiAccount
        .accountLogIn(user)
        .then(() => dispatch(accountCheck()))
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });
};

// Log Out
export const accountLogOut = () => (dispatch) =>
    apiAccount
        .accountLogOut()
        .then(() => {
            dispatch(accountCheck());
            toastr.info('Logout successful.');
        })
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });

// Reset Password
export const accountResetPassword = (user) => (dispatch) =>
    apiAccount
        .accountResetPassword(user)
        .then(() => toastr.info(`Sent password reset email to ${user.email}`))
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });
