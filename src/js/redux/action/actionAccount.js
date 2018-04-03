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
    dispatch(ajaxCallBegin()); // used to display a preloader before calls (optional)
    return apiAccount
        .accountCheck()
        .then((user) => {
            // function from API (requires return)
            if (user) {
                dispatch(accountLogInSuccess(user));
                toastr.success(`Welcome ${user.email}!`);
            } else {
                dispatch(accountLogOutSuccess());
            }
            dispatch(accountCheckSuccess());
        })
        .catch((error) => {
            dispatch(ajaxCallError(error));
            toastr.error(error.message);
            throw error;
        });
};

// Register
export const accountRegister = (user) => (dispatch) =>
    apiAccount
        .accountRegister(user)
        .then(() => {
            // function from API (requires return)
            dispatch(accountCheck());
            toastr.warning('Registering...'); // possibly remove
        })
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });

// Log In
export const accountLogIn = (user) => (dispatch) =>
    apiAccount
        .accountLogIn(user)
        .then(() => {
            // function from API (requires return)
            dispatch(accountCheck());
            toastr.warning('Logging in...'); // possibly remove
        })
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });

// Log Out
export const accountLogOut = () => (dispatch) =>
    apiAccount
        .accountLogOut()
        .then(() => {
            // function from API (requires return)
            dispatch(accountCheck());
            toastr.warning('Logging out...'); // possibly remove
        })
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });

// Reset Password
export const accountResetPassword = (user) => (dispatch) => {
    dispatch(ajaxCallBegin()); // used to display a preloader before calls (optional)
    return apiAccount
        .accountResetPassword(user)
        .then(() => {
            // function from API (requires return)
            toastr.info(`Sent password reset email to ${user.email}`);
        })
        .catch((error) => {
            dispatch(ajaxCallError(error));
            toastr.error(error.message);
            throw error;
        });
};
