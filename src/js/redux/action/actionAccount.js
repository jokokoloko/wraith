import toastr from 'toastr';
import { callBegin, callError } from './actionCall';
import { profileLoad } from './actionProfile';
import { ACCOUNT_LOG_IN_SUCCESS, ACCOUNT_LOG_OUT_SUCCESS, ACCOUNT_CHECK_SUCCESS } from '../type';
import apiAccount from '../../../api/apiAccount';

toastr.options.positionClass = 'toast-top-center';

// Check
export const accountLogInSuccess = () => ({
    type: ACCOUNT_LOG_IN_SUCCESS,
});

export const accountLogOutSuccess = () => ({
    type: ACCOUNT_LOG_OUT_SUCCESS,
});

export const accountCheckSuccess = () => ({
    type: ACCOUNT_CHECK_SUCCESS,
});

export const accountCheck = () => (dispatch) => {
    dispatch(callBegin());
    return apiAccount
        .accountCheck()
        .then((account) => {
            account ? dispatch(accountLogInSuccess()) : dispatch(accountLogOutSuccess());
            account && dispatch(profileLoad(account));
            dispatch(accountCheckSuccess());
        })
        .catch((error) => {
            dispatch(callError(error));
            toastr.error(error.message);
            throw error;
        });
};

// Register
export const accountRegister = (account) => (dispatch) => {
    toastr.warning('Registering...'); // possibly remove
    return apiAccount
        .accountRegister(account)
        .then(() => dispatch(accountCheck()))
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });
};

// Log In
export const accountLogIn = (account) => (dispatch) => {
    toastr.warning('Logging in...'); // possibly remove
    return apiAccount
        .accountLogIn(account)
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
export const accountResetPassword = (account) => (dispatch) =>
    apiAccount
        .accountResetPassword(account)
        .then(() => toastr.info(`Sent password reset email to ${account.email}`))
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });
